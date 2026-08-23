# Project pages

One folder per project. Drop it in, commit, done — the page builds itself.

    public/work/marble/
      index.md          the writing + frontmatter
      cover.jpg         images live beside the text
      screens.jpg

## index.md

    ---
    title: Marble
    date: July 2026
    medium: iOS App
    description: One line, used on the homepage row and in the archive.
    cover: cover.jpg          # optional — first image is used otherwise
    tint: "#E8E5DE"           # optional page background
    featured: true            # optional — adds a homepage row
    ---

    Opening context: what it is, why, your role, where it landed.
    Write as much as it deserves; blank lines separate paragraphs.

    ![](cover.jpg)

    A passage between images, only where an image needs its "why".

    ![](a.jpg) ![](b.jpg)

## The rules

- Blank-line-separated prose becomes a text block (cols 5-9 of the page).
- A line holding one image becomes a full-width frame at its natural
  ratio; one video becomes the full player (Pause / Fullscreen / Unmute).
- Two or three pieces on one line share a row — widths in ratio so the
  row has one height. Videos in a row play as silent loops; put a
  same-name .jpg beside a clip (clip-pill.mp4 + clip-pill.jpg) and it
  becomes the poster and the frame size. Rule of thumb on desktop: two
  or three per row, never one small square alone.
- Four or more on one line are a bounded artifact (deck, program,
  carousel, magazine) — one tile on the page that opens the reader. The
  first alt text is its title; add a flag after a pipe:
    ![Program | gallery](p-1.jpg) ![](p-2.jpg) ![](p-3.jpg)   viewer for just 3
    ![Combat Journal | reader](page-01.jpg) ...                front+back tile
    ![Moodboard | board](a.jpg) ![](b.jpg) ...                 the wall
  `board` is the moodboard: a mosaic tile, and on open the whole set laid
  out at once — drag or trackpad to pan, pinch or ⌘-wheel to zoom, click
  an image to bring it forward, click again / Escape to step back,
  Escape again to leave.
- `> quoted` lines are a pull quote; a last line starting with — is the author.
- `## Title` starts a section and adds it to the rail on the left.
- Image paths are relative to the folder; paths starting with `/` are
  used as-is, so `/images/foo.png` also works.
- The folder name is the URL: `public/work/marble/` -> `/work/marble`.
- Writing a project replaces its placeholder entry automatically; the
  placeholders that remain keep showing until you write them.

Any plain-text editor works — TextEdit (Format -> Make Plain Text),
VS Code, iA Writer, Obsidian. It's just a `.md` file.
