/** @jsx figma.widget.h */

import { once, showUI } from "@create-figma-plugin/utilities";
import { Board } from "./components/Board";

const { widget } = figma;
const { useSyncedState, usePropertyMenu } = widget;

export default function () {
  widget.register(Connectfive);
}

function Connectfive() {
  const [text, setText] = useSyncedState("text", "Hello\nWidgets");
  const items: Array<WidgetPropertyMenuItem> = [
    {
      itemType: "action",
      propertyName: "edit",
      tooltip: "Edit",
    },
  ];
  async function onChange({
    propertyName,
  }: WidgetPropertyEvent): Promise<void> {
    await new Promise<void>(function (resolve: () => void): void {
      if (propertyName === "edit") {
        showUI({ height: 144, width: 240 }, { text });
        once("UPDATE_TEXT", function (text: string): void {
          setText(text);
          resolve();
        });
      }
    });
  }
  usePropertyMenu(items, onChange);
  return <Board />;
}
