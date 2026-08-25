// Every essay on the site: the Playfighter Substack pull plus the early
// pieces recovered from the first personal site, one chronology.

import { charlatanEssays } from "./charlatan";
import { earlyEssays } from "./early-writing";
import { essays as substackEssays, type Essay } from "./writing";

export { wordCount } from "./writing";
export type { Essay };

export const essays: Essay[] = [
  ...substackEssays,
  ...earlyEssays,
  ...charlatanEssays,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
