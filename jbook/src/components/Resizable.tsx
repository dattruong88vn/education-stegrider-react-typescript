import { ResizableBox, ResizeHandle } from "react-resizable";
import "../styles/resizable.css";

interface ResizableProps {
  children: React.ReactNode;
  axis: "x" | "y";
  resizeHandles: ResizeHandle[] | undefined;
  height: number;
  width: number;
  className?: string;
  maxConstraints?: [number, number];
  minConstraints?: [number, number];
}

const Resizable: React.FC<ResizableProps> = ({
  children,
  axis,
  resizeHandles,
  height,
  width,
  className,
  maxConstraints,
  minConstraints,
}) => {
  return (
    <ResizableBox
      height={height}
      width={width}
      axis={axis}
      resizeHandles={resizeHandles}
      className={className}
      maxConstraints={maxConstraints}
      minConstraints={minConstraints}
    >
      {children}
    </ResizableBox>
  );
};

export default Resizable;
