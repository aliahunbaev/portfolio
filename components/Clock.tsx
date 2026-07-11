"use client";

import { useEffect, useState } from "react";
import styles from "./Clock.module.css";

const LOCATION = "Brooklyn, New York";
const TIME_ZONE = "America/New_York";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZoneName: "short", // EST / EDT, derived live so it's always correct
});

function currentTime() {
  // "6:27 PM EST" — collapse the comma the formatter inserts before the zone
  return formatter.format(new Date()).replace(",", "");
}

export default function Clock() {
  // null on the server + first client render → no hydration mismatch; the
  // real time is filled in on mount and then re-derived every minute.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const tick = () => {
      setTime(currentTime());
      // align the next tick to the top of the following minute
      const now = new Date();
      const msToNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      timeout = setTimeout(tick, msToNextMinute);
    };

    tick();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <footer className={styles.clock}>
      <span className={styles.location}>{LOCATION}</span>
      <span aria-hidden="true" className={styles.dot}>
        ·
      </span>
      {/* suppressHydrationWarning: time is intentionally client-only */}
      <time suppressHydrationWarning className={styles.time}>
        {time ?? " "}
      </time>
    </footer>
  );
}
