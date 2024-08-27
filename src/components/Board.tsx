/** @jsx figma.widget.h */

import { boardLength } from "../constants/gameConstants";
import { useGame } from "../hooks/useGame";
import Tile from "./Tile";

const { widget } = figma;
const { AutoLayout } = widget;

export const Board = () => {
  const { tileStatuses, isGameOver, handleTileClick } = useGame();

  const tileSize = 42;
  const boardSize = boardLength * tileSize + 32;

  const rows = [];
  for (let row = 1; row < boardLength - 1; row++) {
    const rowTiles = [];
    for (let col = 1; col < boardLength - 1; col++) {
      const key = `${row}-${col}`;
      rowTiles.push(
        <Tile
          key={key}
          status={tileStatuses[row][col]}
          rowIndex={row}
          colIndex={col}
          isGameOver={isGameOver}
          onClick={handleTileClick}
        />
      );
    }
    rows.push(
      <AutoLayout
        key={row}
        direction="horizontal"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        spacing={1}
        padding={1}
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
      spacing={1}
      width={boardSize}
      height={boardSize}
      fill="#000000"
    >
      {rows}
    </AutoLayout>
  );
};
