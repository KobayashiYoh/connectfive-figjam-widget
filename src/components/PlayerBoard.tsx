/** @jsx figma.widget.h */

import { Stone } from "./Stone";

const { widget } = figma;
const { AutoLayout, Text } = widget;

interface PlayerBoardProps {
  resultText: string;
  isBlack: boolean;
}

export const PlayerBoard = ({ resultText, isBlack }: PlayerBoardProps) => {
  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
    >
      <Text>{resultText}</Text>
      <AutoLayout
        direction="vertical"
        horizontalAlignItems="center"
        verticalAlignItems="center"
        fill={"#A052FE"}
        padding={32}
      >
        <Stone isBlack={isBlack} />
        <Text fill="#FFFFFF">{isBlack ? "Player1" : "Player2"}</Text>
      </AutoLayout>
    </AutoLayout>
  );
};
