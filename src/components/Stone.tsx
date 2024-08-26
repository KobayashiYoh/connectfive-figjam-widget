/** @jsx figma.widget.h */

const { widget } = figma;
const { Rectangle } = widget;

interface StoneProps {
  isBlack: boolean;
}

export const Stone = ({ isBlack }: StoneProps) => {
  return (
    <Rectangle
      width={40}
      height={40}
      fill={{
        type: "solid",
        color: isBlack
          ? { r: 0, g: 0, b: 0, a: 1 }
          : { r: 1, g: 1, b: 1, a: 1 },
      }}
      cornerRadius={20}
    />
  );
};
