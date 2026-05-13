/** Format ISO date to relative Hebrew time (e.g., "לפני 3 ימים") */
export function formatRelativeDate(isoDate) {
  const diffMs = Date.now() - new Date(isoDate).getTime();
  const m = Math.floor(diffMs / 60000);
  const h = Math.floor(diffMs / 3600000);
  const d = Math.floor(diffMs / 86400000);
  const w = Math.floor(d / 7);
  const mo = Math.floor(d / 30);
  const y = Math.floor(d / 365);

  if (m < 1) return "עכשיו";
  if (m < 60) return `לפני ${m} דקות`;
  if (h < 24) return `לפני ${h} שעות`;
  if (d === 1) return "אתמול";
  if (d < 7) return `לפני ${d} ימים`;
  if (w === 1) return "לפני שבוע";
  if (w < 4) return `לפני ${w} שבועות`;
  if (mo === 1) return "לפני חודש";
  if (mo < 12) return `לפני ${mo} חודשים`;
  if (y === 1) return "לפני שנה";
  return `לפני ${y} שנים`;
}

/** Parse ISO 8601 duration (PT1H2M3S) to readable format */
export function formatDuration(isoDuration) {
  if (!isoDuration) return "";
  const m = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  const h = +m[1] || 0;
  const min = +m[2] || 0;
  const s = +m[3] || 0;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;
}
