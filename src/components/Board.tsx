/** @jsx figma.widget.h */

import { boardLength } from "../constants/gameConstants";
import { useGame } from "../hooks/useGame";
import { PlayerBoard } from "./PlayerBoard";
import Tile from "./Tile";

const { widget } = figma;
const { AutoLayout, Text } = widget;

export const Board = () => {
  const {
    tileStatuses,
    blackResultText,
    whiteResultText,
    isGameOver,
    handleTileClick,
    resetGame,
  } = useGame();

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
      direction="horizontal"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      padding={10}
    >
      <PlayerBoard resultText={blackResultText} isBlack={true} />
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
      >
        {isGameOver && (
          <AutoLayout
            onClick={resetGame}
            direction="horizontal"
            horizontalAlignItems="center"
            verticalAlignItems="center"
            padding={10}
            fill={"#A052FE"}
          >
            <Text fill={"#FFFFFF"}>Continue</Text>
          </AutoLayout>
        )}
        <AutoLayout
          direction="vertical"
          horizontalAlignItems="center"
          verticalAlignItems="center"
          spacing={2}
          width={boardSize}
          height={boardSize}
          fill="#000000"
        >
          {rows}
        </AutoLayout>
      </AutoLayout>
      <PlayerBoard resultText={whiteResultText} isBlack={false} />
    </AutoLayout>
  );
};
