// contextAPI 활용
const initialState = {
  tableData: [],
  timer: 0,
  result: "",
};

export const START_GAME = "START_GAME";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
      };

    default:
      return state;
  }
};

// 초기값 세팅 (createContext)
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //useMemo로 캐싱한  contextAPI를 사용하여 계속되는 렌더링 방지
  const value = useMemo(
    () => ({ tableData: state.tableData, dispatch }),
    [state.tableData]
  );

  return (
    //value = {{ tableData: state.tableData, dispatch }} --> useMemo로 캐싱
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};
