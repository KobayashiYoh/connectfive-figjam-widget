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
      spacing={32}
    >
      <PlayerBoard
        resultText={blackResultText}
        playerName="Player1"
        isBlack={true}
      />
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        spacing={16}
      >
        {isGameOver && (
          <AutoLayout
            onClick={resetGame}
            horizontalAlignItems="center"
            verticalAlignItems="center"
            fill={"#A052FE"}
            cornerRadius={8}
            padding={16}
          >
            <Text fill={"#FFFFFF"}>Continue</Text>
          </AutoLayout>
        )}
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
      </AutoLayout>
      <PlayerBoard
        resultText={whiteResultText}
        playerName="Player2"
        isBlack={false}
      />
    </AutoLayout>
  );
};
