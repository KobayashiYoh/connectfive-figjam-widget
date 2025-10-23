/** @jsx figma.widget.h */

import { TileStatus } from "../types/tileStatus";
import { Stone } from "./Stone";

const { widget } = figma;
const { AutoLayout, Rectangle, Frame } = widget;

const Tile = ({
  status,
  rowIndex,
  colIndex,
  isGameOver,
  onClick,
  isTopEdge,
  isBottomEdge,
  isLeftEdge,
  isRightEdge,
}: {
  status: TileStatus;
  rowIndex: number;
  colIndex: number;
  isGameOver: boolean;
  onClick: (rowIndex: number, colIndex: number) => void;
  isTopEdge: boolean;
  isBottomEdge: boolean;
  isLeftEdge: boolean;
  isRightEdge: boolean;
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

  const lineColor = { r: 0.2, g: 0.2, b: 0.2, a: 1 };
  const lineWidth = 2;
  const tileSize = 40;

  const verticalLineHeight =
    isTopEdge && isBottomEdge
      ? lineWidth
      : isTopEdge
      ? tileSize / 2
      : isBottomEdge
      ? tileSize / 2
      : tileSize;
  const verticalLineY = isTopEdge ? tileSize / 2 : 0;

  const horizontalLineWidth =
    isLeftEdge && isRightEdge
      ? lineWidth
      : isLeftEdge
      ? tileSize / 2
      : isRightEdge
      ? tileSize / 2
      : tileSize;
  const horizontalLineX = isLeftEdge ? tileSize / 2 : 0;

  return (
    <Frame width={tileSize} height={tileSize} onClick={handleClick}>
      <Rectangle
        width={lineWidth}
        height={verticalLineHeight}
        x={tileSize / 2 - lineWidth / 2}
        y={verticalLineY}
        fill={lineColor}
      />
      <Rectangle
        width={horizontalLineWidth}
        height={lineWidth}
        x={horizontalLineX}
        y={tileSize / 2 - lineWidth / 2}
        fill={lineColor}
      />
      <Rectangle
        width={tileSize}
        height={tileSize}
        x={0}
        y={0}
        fill={{ r: 0.99, g: 0.84, b: 0.74, a: 0 }}
        hoverStyle={{
          fill: isGameOver ? undefined : { r: 0.99, g: 0.84, b: 0.74, a: 0.4 },
        }}
      />
      {(status === TileStatus.Black || status === TileStatus.White) && (
        <AutoLayout
          width={tileSize}
          height={tileSize}
          horizontalAlignItems="center"
          verticalAlignItems="center"
          x={0}
          y={0}
        >
          {renderTile(status)}
        </AutoLayout>
      )}
    </Frame>
  );
};

export default Tile;
