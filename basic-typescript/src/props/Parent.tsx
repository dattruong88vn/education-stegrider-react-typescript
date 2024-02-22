import { Child, ChildAsFC } from "./Child";

const Parent = () => {
  return (
    <div>
      <Child color="red" onClick={() => console.log("Clicked")}>
        <h3>Child</h3>
      </Child>
      <ChildAsFC color="red" onClick={() => console.log("Clicked")}>
        <h3>ChildAsFC</h3>
      </ChildAsFC>
    </div>
  );
};

export default Parent;
