/** @jsx figma.widget.h */

import { boardLength } from "../constants/gameConstants";
import { useGame } from "../hooks/useGame";
import Tile from "./Tile";

const { widget } = figma;
const { AutoLayout } = widget;

export const Board = () => {
  const { tileStatuses, isGameOver, handleTileClick } = useGame();

  const tileSize = 40;
  const boardSize = (boardLength - 2) * tileSize;

  const rows = [];
  for (let row = 1; row < boardLength - 1; row++) {
    const rowTiles = [];
    for (let col = 1; col < boardLength - 1; col++) {
      const key = `${row}-${col}`;
      const isTopEdge = row === 1;
      const isBottomEdge = row === boardLength - 2;
      const isLeftEdge = col === 1;
      const isRightEdge = col === boardLength - 2;

      rowTiles.push(
        <Tile
          key={key}
          status={tileStatuses[row][col]}
          rowIndex={row}
          colIndex={col}
          isGameOver={isGameOver}
          onClick={handleTileClick}
          isTopEdge={isTopEdge}
          isBottomEdge={isBottomEdge}
          isLeftEdge={isLeftEdge}
          isRightEdge={isRightEdge}
        />
      );
    }
    rows.push(
      <AutoLayout
        key={row}
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        spacing={0}
        width={boardSize}
        height={tileSize}
      >
        {rowTiles}
      </AutoLayout>
    );
  }

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      spacing={0}
      padding={20}
      fill={{
        type: "solid",
        color: { r: 0.89, g: 0.64, b: 0.34, a: 1 },
      }}
    >
      {rows}
    </AutoLayout>
  );
};
