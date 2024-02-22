import ReactDOM from "react-dom/client";

import { GuestList } from "./state/GuestList";

const App = () => {
  return (
    <div>
      <h1>Hi there, this is my app!</h1>
      <GuestList />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
