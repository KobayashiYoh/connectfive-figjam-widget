/** @jsx figma.widget.h */

import { Stone } from "./Stone";

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface PlayerBoardProps {
  resultText: string;
  playerName: string;
  isBlack: boolean;
  isCurrentTurn: boolean;
}

export const PlayerBoard = ({
  resultText,
  playerName,
  isBlack,
  isCurrentTurn,
}: PlayerBoardProps) => {
  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      spacing={8}
    >
      <Text fontSize={18}>{resultText}</Text>
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        fill={"#A052FE"}
        padding={{ vertical: 24, horizontal: 16 }}
        cornerRadius={8}
        spacing={8}
      >
        <Stone isBlack={isBlack} />
        <Text fill="#FFFFFF">{playerName}</Text>
      </AutoLayout>
      <Text>{isCurrentTurn ? "Your turn" : ""}</Text>
    </AutoLayout>
  );
};
