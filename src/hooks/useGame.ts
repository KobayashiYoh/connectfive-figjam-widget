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
  const [isGameOver, setIsGameOver] = useSyncedState("isGameOver", false);
  const [blackResultText, setBlackResultText] = useSyncedState(
    "blackResultText",
    ""
  );
  const [whiteResultText, setWhiteResultText] = useSyncedState(
    "whiteResultText",
    ""
  );

  const switchTurn = () => {
    setIsBlackTurn(!isBlackTurn);
  };

  const resetGame = () => {
    setTileStatuses(initializeTileStatuses);
    setIsBlackTurn(true);
    setIsGameOver(false);
    setBlackResultText("");
    setWhiteResultText("");
  };

  const handleTileClick = (rowIndex: number, colIndex: number) => {
    if (isGameOver) {
      return;
    }

    const selectedStatus: TileStatus = tileStatuses[rowIndex][colIndex];
    if (isNotEmpty(selectedStatus)) {
      return;
    }

    const newTileStatuses = tileStatuses.map((row) => [...row]);
    newTileStatuses[rowIndex][colIndex] = currentTurnStatus(isBlackTurn);
    setTileStatuses(newTileStatuses);

    const tileStatus = currentTurnStatus(isBlackTurn);
    if (checkWin(newTileStatuses, rowIndex, colIndex, tileStatus)) {
      setBlackResultText(`${isBlackTurn ? "Winner!" : "loser…"}`);
      setWhiteResultText(`${isBlackTurn ? "loser…" : "Winner!"}`);
      setIsGameOver(true);
    } else if (areAllTilesFilled(newTileStatuses)) {
      setBlackResultText("draw");
      setWhiteResultText("draw");
      setIsGameOver(true);
    } else {
      switchTurn();
    }
  };

  return {
    tileStatuses,
    blackResultText,
    whiteResultText,
    isBlackTurn,
    isGameOver,
    handleTileClick,
    resetGame,
  };
};
