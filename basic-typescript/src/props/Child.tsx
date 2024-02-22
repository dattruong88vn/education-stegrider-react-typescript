interface ChildProps {
  color: string;
}

export const Child = ({ color }: ChildProps) => {
  return <div>Child Component and props {color}</div>;
};

export const ChildAsFC: React.FC<ChildProps> = ({ color }) => {
  return <div>Child FC Component and props {color}</div>;
};

// console.log(Child.displayName)
// console.log(ChildAsFC.displayName)
