/** @jsx figma.widget.h */

import { TileStatus } from "../types/tileStatus";

const { widget } = figma;
const { AutoLayout, Rectangle } = widget;

const Stone = ({ isBlack }: { isBlack: boolean }) => (
  <Rectangle
    width={40}
    height={40}
    fill={{
      type: "solid",
      color: isBlack ? { r: 0, g: 0, b: 0, a: 1 } : { r: 1, g: 1, b: 1, a: 1 },
    }}
    cornerRadius={20}
  />
);

const Tile = ({
  status,
  rowIndex,
  colIndex,
  onClick,
}: {
  status: TileStatus;
  rowIndex: number;
  colIndex: number;
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
        color: { r: 0.89, g: 0.64, b: 0.34, a: 1 }, // Background color of the tile
      }}
    >
      {renderTile(status)}
    </AutoLayout>
  );
};

export default Tile;
