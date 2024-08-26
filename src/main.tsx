/** @jsx figma.widget.h */

import { Board } from "./components/Board";
import { PlayerBoard } from "./components/PlayerBoard";
const { widget } = figma;
const { AutoLayout, Text } = widget;

export default function () {
  widget.register(Connectfive);
}

function Connectfive() {
  return <Board />;
}
