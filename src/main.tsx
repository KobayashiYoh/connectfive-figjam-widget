/** @jsx figma.widget.h */

import { GameScreen } from "./components/GameScreen";
const { widget } = figma;

export default function () {
  widget.register(Connectfive);
}

function Connectfive() {
  return <GameScreen />;
}
