/** @jsx figma.widget.h */

const { widget } = figma;
const { Rectangle } = widget;

interface StoneProps {
  isBlack: boolean;
}

export const Stone = ({ isBlack }: StoneProps) => {
  return (
    <Rectangle
      width={32}
      height={32}
      fill={{
        type: "solid",
        color: isBlack ? "#000000" : "#FFFFFF",
      }}
      cornerRadius={20}
      
    />
  );
};
