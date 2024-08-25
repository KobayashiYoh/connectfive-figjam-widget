export const TileStatus = {
  Wall: "■",
  Empty: " ",
  Black: "●",
  White: "○",
} as const;

export type TileStatus = (typeof TileStatus)[keyof typeof TileStatus];
