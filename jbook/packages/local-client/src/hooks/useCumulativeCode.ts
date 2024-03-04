import { useTypedSelector } from "./useTypeSelector";

export const useCumulativeCode = (cellId: string) => {
  return (
    useTypedSelector((state) => {
      const { data, order } = state.cells;

      // get all cell (include code and text)
      const orderedCells = order.map((id) => data[id]);
      const showFn = `
          import _React from 'react';
          import _ReactDOM from 'react-dom';
          
          const root = document.getElementById('root');

          root.innerHTML = '';
          
          var show = (value) => {
            if (typeof value === 'object') {
              if (value.$$typeof && value.props) {
                _ReactDOM.render(value, root)
              } else {
                root.innerHTML = JSON.stringify(value);
              }

            } else {
              root.innerHTML = value;
            }
          }
      `;

      const showFnNoop = `var show = () => {}`;

      // get code from first cell to current cell
      let cumulativeCode = [];

      for (let c of orderedCells) {
        if (c.type === "code") {
          cumulativeCode.push(c.id === cellId ? showFn : showFnNoop);
          cumulativeCode.push(c.content);

          // stop when reach current cell
          if (c.id === cellId) {
            break;
          }
        }
      }
      return cumulativeCode;
    }) || []
  ).join("\n");
};
