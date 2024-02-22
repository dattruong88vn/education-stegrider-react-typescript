interface ChildProps {
  color: string;
  onClick: () => void;
  children: React.ReactNode;
}

export const Child = ({ color, onClick, children }: ChildProps) => {
  return (
    <div>
      Child Component and props {color} {children}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export const ChildAsFC: React.FC<ChildProps> = ({
  color,
  onClick,
  children,
}) => {
  return (
    <div>
      Child FC Component and props {color}
      {children}
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

// console.log(Child.displayName)
// console.log(ChildAsFC.displayName)
