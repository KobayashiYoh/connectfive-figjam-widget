/** @jsx figma.widget.h */

import { TileStatus } from "../types/tileStatus";
import { Stone } from "./Stone";

const { widget } = figma;
const { AutoLayout } = widget;

const Tile = ({
  status,
  rowIndex,
  colIndex,
  isGameOver,
  onClick,
}: {
  status: TileStatus;
  rowIndex: number;
  colIndex: number;
  isGameOver: boolean;
  onClick: (rowIndex: number, colIndex: number) => void;
}) => {
  const handleClick = () => onClick(rowIndex, colIndex);

  const renderTile = (status: TileStatus) => {
    switch (status) {
      case TileStatus.Empty:
      case TileStatus.Wall:
        return null; // Empty or Wall tiles render nothing
      case TileStatus.Black:
        return <Stone isBlack={true} />;
      case TileStatus.White:
        return <Stone isBlack={false} />;
    }
  };

  return (
    <AutoLayout
      direction="vertical"
      horizontalAlignItems="center"
      verticalAlignItems="center"
      spacing={0}
      padding={0}
      width={40}
      height={40}
      onClick={handleClick}
      fill={{
        type: "solid",
        color: { r: 0.89, g: 0.64, b: 0.34, a: 1 },
      }}
      hoverStyle={{
        fill: isGameOver ? undefined : { r: 0.99, g: 0.84, b: 0.74, a: 1 },
      }}
    >
      {renderTile(status)}
    </AutoLayout>
  );
};

export default Tile;
