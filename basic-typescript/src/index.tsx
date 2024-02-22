import ReactDOM from "react-dom/client";
const App = () => {
  return (
    <div>
      <h1>Hi there, this is my app!</h1>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(<App />);
