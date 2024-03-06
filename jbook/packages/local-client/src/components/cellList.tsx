import { Fragment, useEffect } from "react";
import { useActions } from "src/hooks/useAction";
import "src/styles/add-cell.css";
import "src/styles/cell-list.css";
import { useTypedSelector } from "../hooks/useTypeSelector";
import AddCell from "./addCell";
import CellListItem from "./cellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const { fetchCells } = useActions();

  useEffect(() => {
    fetchCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell forcedVisible={cells.length === 0} previousCellId={null} />
      {renderCells}
    </div>
  );
};

export default CellList;
