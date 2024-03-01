import { useActions } from "src/hooks/useAction";
import "src/styles/add-cell.css";
import BaseBtn from "./BaseBtn";

interface AddCellProps {
  nextCellId: string | null;
  forcedVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ nextCellId, forcedVisible }) => {
  const { insertCellBefore } = useActions();

  return (
    <div className={`add-cell ${forcedVisible && "forced-visible"}`}>
      <div className="add-buttons">
        <BaseBtn
          icon="fa fa-plus"
          onClick={() => insertCellBefore(nextCellId, "code")}
          className="is-rounded is-primary is-small"
          iconClassName="is-small"
          text="Code"
        />
        <BaseBtn
          icon="fa fa-plus"
          onClick={() => insertCellBefore(nextCellId, "text")}
          className="is-rounded is-primary is-small"
          iconClassName="is-small"
          text="Text"
        />
      </div>
      <div className="divider" />
    </div>
  );
};

export default AddCell;
