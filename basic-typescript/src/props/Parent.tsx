import { Child, ChildAsFC } from "./Child";

const Parent = () => {
  return (
    <div>
      <Child color="red" />
      <ChildAsFC color="red" />
    </div>
  );
};

export default Parent;
