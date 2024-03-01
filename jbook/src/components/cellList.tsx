import { useTypedSelector } from "../hooks/useTypeSelector";
import CellListItem from "./cellListItem";

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }) =>
    order.map((id) => data[id])
  );

  console.log({ cells });

  const renderCells = cells.map((cell) => (
    <CellListItem key={cell.id} cell={cell} />
  ));

  return <div>{renderCells}</div>;
};

export default CellList;
