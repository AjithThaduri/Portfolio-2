import meta from "@/lib/mosaic.json";

/* Every photograph on this page is drawn from one sprite sheet, so the whole
   piece costs a single image request instead of fifty-eight. */
export const SPRITE = "/vasuki/tiles.webp";
export const COUNT = meta.count;
const { spriteCols: SC, spriteRows: SR } = meta;

export const tileStyle = (k: number): React.CSSProperties => ({
  backgroundImage: `url(${SPRITE})`,
  backgroundSize: `${SC * 100}% ${SR * 100}%`,
  backgroundPosition: `${((k % SC) / (SC - 1)) * 100}% ${(Math.floor(k / SC) / (SR - 1)) * 100}%`,
});
