import { boardLength, winLength } from "../constants/gameConstants";
import { TileStatus } from "../types/tileStatus";

/**
 * Creates the initial state of the board.
 * Surrounds the board with `TileStatus.Wall` and fills the rest with `TileStatus.Empty`.
 *
 * @returns Initial state of the board represented as a 2D array
 */
export const initializeTileStatuses = (): TileStatus[][] => {
  return Array(boardLength)
    .fill(null)
    .map((_, rowIndex) =>
      Array(boardLength)
        .fill(null)
        .map((_, colIndex) => {
          const isWallIndex =
            rowIndex === 0 ||
            rowIndex === boardLength - 1 ||
            colIndex === 0 ||
            colIndex === boardLength - 1;
          if (isWallIndex) {
            return TileStatus.Wall;
          }
          return TileStatus.Empty;
        })
    );
};

/**
 * Gets the status of the current turn.
 *
 * @param isBlackTurn - Boolean indicating if the current turn is black
 * @returns `TileStatus` for the current turn
 */
export const currentTurnStatus = (isBlackTurn: boolean): TileStatus =>
  isBlackTurn ? TileStatus.Black : TileStatus.White;

/**
 * Checks if a tile's status is not empty.
 *
 * @param status - The status of the tile to check
 * @returns `true` if the status is not empty
 */
export const isNotEmpty = (status: TileStatus): boolean =>
  status !== TileStatus.Empty;

/**
 * Determines if all tiles are filled.
 *
 * @param statuses - 2D array representing the board's tile statuses
 * @returns `true` if all tiles are filled, `false` otherwise
 */
export const areAllTilesFilled = (statuses: TileStatus[][]): boolean =>
  statuses.every((row) => row.every((status) => isNotEmpty(status)));

/**
 * Checks if there is a consecutive sequence of the same tile in the specified direction.
 *
 * @param tileStatuses - 2D array representing the board's tile statuses
 * @param rowIndex - Row index of the tile to check
 * @param colIndex - Column index of the tile to check
 * @param tileStatus - The status of the tile to check (black or white)
 * @param direction - The direction to check (x, y displacement)
 * @returns `true` if there is a consecutive sequence of the same tile
 */
const checkDirection = (
  tileStatuses: TileStatus[][],
  rowIndex: number,
  colIndex: number,
  tileStatus: TileStatus,
  direction: { x: number; y: number }
): boolean => {
  const { x, y } = direction;
  let count = 1;

  // Check forward direction
  for (let i = 1; i < winLength; i++) {
    const newRow = rowIndex + i * y;
    const newCol = colIndex + i * x;
    if (tileStatuses[newRow]?.[newCol] === tileStatus) {
      count++;
    } else {
      break;
    }
  }

  // Check backward direction
  for (let i = 1; i < winLength; i++) {
    const newRow = rowIndex - i * y;
    const newCol = colIndex - i * x;
    if (tileStatuses[newRow]?.[newCol] === tileStatus) {
      count++;
    } else {
      break;
    }
  }

  return count >= winLength;
};

/**
 * Checks if the specified tile meets the winning condition.
 *
 * @param tileStatuses - 2D array representing the board's tile statuses
 * @param rowIndex - Row index of the tile to check
 * @param colIndex - Column index of the tile to check
 * @param tileStatus - The status of the tile to check (black or white)
 * @returns `true` if the tile meets the winning condition
 */
export const checkWin = (
  tileStatuses: TileStatus[][],
  rowIndex: number,
  colIndex: number,
  tileStatus: TileStatus
): boolean => {
  const directions = [
    { x: 1, y: 0 }, // Horizontal
    { x: 0, y: 1 }, // Vertical
    { x: 1, y: 1 }, // Diagonal (top-left to bottom-right)
    { x: 1, y: -1 }, // Diagonal (top-right to bottom-left)
  ];

  return directions.some((direction) =>
    checkDirection(tileStatuses, rowIndex, colIndex, tileStatus, direction)
  );
};
