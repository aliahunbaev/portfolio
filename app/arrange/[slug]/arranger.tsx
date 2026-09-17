"use client";
import { useEffect, useState } from "react";

type Asset = { name: string; url: string; poster?: string; type: "image" | "video"; w: number; h: number };
const LANES: { key: "homeRow" | "caseRow" | "caseRow2"; label: string; hint: string }[] = [
  { key: "homeRow", label: "Homepage strip", hint: "what the homepage shows for this project" },
  { key: "caseRow", label: "Overture, strip one", hint: "first strip on the project page" },
  { key: "caseRow2", label: "Overture, strip two", hint: "second strip on the project page" },
];

export default function Arranger({ slug }: { slug: string }) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [lanes, setLanes] = useState<Record<string, string[]>>({ homeRow: [], caseRow: [], caseRow2: [] });
  const [status, setStatus] = useState("");
  const [drag, setDrag] = useState<{ name: string; from?: string; index?: number } | null>(null);

  useEffect(() => {
    fetch(`/arrange/api?slug=${slug}`).then((r) => r.json()).then((d) => {
      setAssets(d.assets ?? []);
      const next: Record<string, string[]> = {};
      for (const l of LANES) next[l.key] = (d.rows?.[l.key] ?? "").split(",").map((s: string) => s.trim()).filter(Boolean);
      setLanes(next);
    });
  }, [slug]);

  const byName = Object.fromEntries(assets.map((a) => [a.name, a]));
  const ratioSum = (names: string[]) => names.reduce((n, x) => n + (byName[x] ? byName[x].w / byName[x].h : 0), 0);

  function dropInto(lane: string, at: number) {
    if (!drag) return;
    setLanes((prev) => {
      const next = { ...prev };
      if (drag.from) {
        next[drag.from] = [...next[drag.from]];
        next[drag.from].splice(drag.index!, 1);
        if (drag.from === lane && drag.index! < at) at -= 1;
      }
      next[lane] = [...next[lane]];
      next[lane].splice(at, 0, drag.name);
      return next;
    });
    setDrag(null);
  }

  async function save() {
    setStatus("Saving…");
    const body: Record<string, string> = { slug };
    for (const l of LANES) body[l.key] = lanes[l.key].join(", ");
    const r = await fetch("/arrange/api", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
    setStatus(r.ok ? "Saved. The pages hot-reload." : "Save failed.");
  }

  const thumb = (a: Asset, h: number) => (
    <img src={a.poster ?? a.url} alt={a.name} draggable={false} style={{ height: h, width: (a.w / a.h) * h, objectFit: "cover", display: "block", background: "#eee" }} />
  );

  return (
    <main style={{ padding: 24, fontFamily: "ui-sans-serif, system-ui", fontSize: 13, color: "#111" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
        <h1 style={{ fontSize: 16, fontWeight: 600, margin: 0 }}>Arrange strips · {slug}</h1>
        <span style={{ color: "#777" }}>Drag from the shelf into a lane. Drag within a lane to reorder. Click a tile in a lane to remove it. Two to six per strip; keep the ratio sum near 4 so the strip stays tall.</span>
        <button onClick={save} style={{ marginLeft: "auto", padding: "8px 14px", border: "1px solid #111", background: "#111", color: "#fff", borderRadius: 6, cursor: "pointer" }}>Save to index.md</button>
        <span style={{ color: "#777", minWidth: 180 }}>{status}</span>
      </div>

      {LANES.map((l) => {
        const names = lanes[l.key] ?? [];
        const sum = ratioSum(names);
        return (
          <section key={l.key} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "baseline", marginBottom: 8 }}>
              <strong>{l.label}</strong>
              <span style={{ color: "#777" }}>{l.hint} · {names.length} tiles · ratio sum {sum.toFixed(1)}</span>
              <code style={{ color: "#777", marginLeft: "auto" }}>{l.key}: {names.join(", ")}</code>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => dropInto(l.key, names.length)}
              style={{ display: "flex", gap: 8, minHeight: 120, padding: 8, border: "1px dashed #bbb", borderRadius: 8, background: "#fafafa" }}
            >
              {names.map((n, i) => {
                const a = byName[n];
                return (
                  <div
                    key={n + i}
                    draggable
                    onDragStart={() => setDrag({ name: n, from: l.key, index: i })}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => { e.stopPropagation(); dropInto(l.key, i); }}
                    onClick={() => setLanes((p) => ({ ...p, [l.key]: p[l.key].filter((_, j) => j !== i) }))}
                    title={`${n} — click to remove`}
                    style={{ flexGrow: a ? a.w / a.h : 1, flexBasis: 0, minWidth: 0, cursor: "grab" }}
                  >
                    <div style={{ aspectRatio: a ? `${a.w} / ${a.h}` : "1", background: "#eee", overflow: "hidden", borderRadius: 4 }}>
                      {a && <img src={a.poster ?? a.url} alt={n} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
                    </div>
                    <div style={{ fontSize: 11, color: "#777", paddingTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n}{a?.type === "video" ? " · loop" : ""}</div>
                  </div>
                );
              })}
              {names.length === 0 && <span style={{ color: "#aaa", alignSelf: "center" }}>drop here</span>}
            </div>
          </section>
        );
      })}

      <section>
        <div style={{ marginBottom: 8 }}><strong>Shelf</strong> <span style={{ color: "#777" }}>every asset in public/work/{slug}</span></div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {assets.map((a) => (
            <div key={a.name} draggable onDragStart={() => setDrag({ name: a.name })} title={a.name} style={{ cursor: "grab" }}>
              {thumb(a, 96)}
              <div style={{ fontSize: 10, color: "#777", paddingTop: 2, maxWidth: (a.w / a.h) * 96, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.name}{a.type === "video" ? " · loop" : ""}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
