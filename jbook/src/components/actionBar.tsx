import { useActions } from "src/hooks/useAction";
import "src/styles/action-bar.css";
import ActionBarBtn from "./actionBarBtn";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <ActionBarBtn icon="fa fa-arrow-up" onClick={() => moveCell(id, "up")} />
      <ActionBarBtn
        icon="fa fa-arrow-down"
        onClick={() => moveCell(id, "down")}
      />
      <ActionBarBtn icon="fa fa-times" onClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
