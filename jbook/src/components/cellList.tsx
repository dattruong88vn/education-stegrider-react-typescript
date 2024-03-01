import { Fragment } from "react";
import "src/styles/add-cell.css";
import { useTypedSelector } from "../hooks/useTypeSelector";
import AddCell from "./addCell";
import CellListItem from "./cellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  const renderCells = cells.map((cell) => (
    <Fragment key={cell.id}>
      <AddCell nextCellId={cell.id} />
      <CellListItem cell={cell} />
    </Fragment>
  ));

  return (
    <div>
      {renderCells}
      <AddCell forcedVisible={cells.length === 0} nextCellId={null} />
    </div>
  );
};

export default CellList;
