import { useEffect, useState } from "react";
import { ResizableBox, ResizableProps } from "react-resizable";
import "../styles/resizable.css";

interface ResizablePropsType {
  children: React.ReactNode;
  axis: "x" | "y";
}

const Resizable: React.FC<ResizablePropsType> = ({ children, axis }) => {
  let resizableProps: ResizableProps;
  const [windowDimensions, setWindowDimensions] = useState({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);

  const handleResizeWindow = () => {
    setWindowDimensions({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    });
  };

  const { innerWidth, innerHeight } = windowDimensions;

  if (axis === "x") {
    resizableProps = {
      className: "flex",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.9, Infinity],
      height: Infinity,
      width: innerWidth * 0.75,
      resizeHandles: ["e"],
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
