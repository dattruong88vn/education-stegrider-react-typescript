import { useActions } from "src/hooks/useAction";
import "src/styles/action-bar.css";
import BaseBtn from "./BaseBtn";

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();

  return (
    <div className="action-bar">
      <BaseBtn icon="fa fa-arrow-up" onClick={() => moveCell(id, "up")} />
      <BaseBtn icon="fa fa-arrow-down" onClick={() => moveCell(id, "down")} />
      <BaseBtn icon="fa fa-times" onClick={() => deleteCell(id)} />
    </div>
  );
};

export default ActionBar;
