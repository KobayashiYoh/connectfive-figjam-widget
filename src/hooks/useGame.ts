const { widget } = figma;
const { useSyncedState } = widget;
import { TileStatus } from "../types/tileStatus";
import {
  areAllTilesFilled,
  checkWin,
  currentTurnStatus,
  initializeTileStatuses,
  isNotEmpty,
} from "../utils/gameLogics";

export const useGame = () => {
  const [tileStatuses, setTileStatuses] = useSyncedState(
    "tileStatuses",
    initializeTileStatuses
  );
  const [isBlackTurn, setIsBlackTurn] = useSyncedState("isBlackTurn", true);

  const switchTurn = () => {
    setIsBlackTurn(!isBlackTurn);
  };

  const handleTileClick = (rowIndex: number, colIndex: number) => {
    console.log(`Tile clicked at ${rowIndex}, ${colIndex}`);

    const selectedStatus: TileStatus = tileStatuses[rowIndex][colIndex];
    if (isNotEmpty(selectedStatus)) {
      return;
    }

    const newTileStatuses = tileStatuses.map((row) => [...row]);
    newTileStatuses[rowIndex][colIndex] = currentTurnStatus(isBlackTurn);
    setTileStatuses(newTileStatuses);

    const tileStatus = currentTurnStatus(isBlackTurn);
    if (checkWin(newTileStatuses, rowIndex, colIndex, tileStatus)) {
      console.log(`${isBlackTurn ? "黒" : "白"}の勝ちです！`);
    } else if (areAllTilesFilled(newTileStatuses)) {
      console.log("引き分け");
    } else {
      switchTurn();
    }
  };

  return { tileStatuses, handleTileClick };
};
