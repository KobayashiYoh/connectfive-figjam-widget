/** @jsx figma.widget.h */

import { useGame } from "../hooks/useGame";
import { Board } from "./Board";
import { PlayerBoard } from "./PlayerBoard";

const { widget } = figma;
const { AutoLayout, Text } = widget;

export const GameScreen = () => {
  const { blackResultText, whiteResultText, isGameOver, resetGame } = useGame();

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
        <Board />
      </AutoLayout>
      <PlayerBoard
        resultText={whiteResultText}
        playerName="Player2"
        isBlack={false}
      />
    </AutoLayout>
  );
};
