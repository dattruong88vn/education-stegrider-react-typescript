import { useEffect, useState } from "react";
import {
  ResizableBox,
  ResizableProps,
  ResizeCallbackData,
} from "react-resizable";
import "../../styles/resizable.css";

interface ResizablePropsType {
  children: React.ReactNode;
  axis: "x" | "y";
}

const Resizable: React.FC<ResizablePropsType> = ({ children, axis }) => {
  let resizableProps: ResizableProps;
  const [dimensions, setDimensions] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    editorWidth: window.innerWidth * 0.75,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const handleResizeWindow = () => {
      if (timer) clearTimeout(timer);

      timer = setTimeout(() => {
        setDimensions({
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
          editorWidth:
            window.innerWidth * 0.75 < dimensions.editorWidth
              ? window.innerWidth * 0.75
              : dimensions.editorWidth,
        });
      }, 500);
    };

    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const { innerWidth, innerHeight, editorWidth } = dimensions;

  if (axis === "x") {
    resizableProps = {
      className: "flex",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.9, Infinity],
      height: Infinity,
      width: editorWidth,
      resizeHandles: ["e"],
      onResizeStop: (_, data: ResizeCallbackData) => {
        const width = data.size.width;
        setDimensions({
          ...dimensions,
          innerWidth: width / 0.75,
          editorWidth: width,
        });
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 200,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return (
    <ResizableBox axis={axis} {...resizableProps}>
      {children}
    </ResizableBox>
  );
};

export default Resizable;
