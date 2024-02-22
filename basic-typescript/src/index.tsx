import ReactDOM from "react-dom/client";
import UserSearch from "./refs/UserSearch";

const App = () => {
  return (
    <div>
      <h1>Hi there, this is my app!</h1>
      <UserSearch />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
