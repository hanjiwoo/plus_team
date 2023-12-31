import { createContext, useReducer, useMemo, useEffect } from "react";
import Form from "./Form";
import Table from "./Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch, faSmileWink } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted, timer, result } = state;

  // useEffect를 통해 타이머를 1초마다 dispatch
  useEffect(() => {
    let timer;
    if (!halted) {
      timer = setInterval(() => {
        dispatch({ type: INCREMENT_TIMER });
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [halted]);

  //useMemo로 캐싱한  contextAPI를 사용하여 계속되는 렌더링 방지
  const value = useMemo(
    () => ({ tableData: tableData, halted: halted, dispatch }),
    [tableData, halted]
  );

  return (
    //value = {{ tableData: state.tableData, dispatch }} --> useMemo로 캐싱
    <TableContext.Provider value={value}>
      <Form />
      <StTimer>
        <FontAwesomeIcon icon={faStopwatch} /> {timer}
      </StTimer>
      <Table />

      {state.isWin ? (
        <StWin class="result-win">
          <FontAwesomeIcon icon={faSmileWink} /> {result}
        </StWin>
      ) : (
        <StFail class="result-fail">{result}</StFail>
      )}
    </TableContext.Provider>
  );
};

export default MineSearch;

// styled-components //
const StTimer = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: 40px;
  gap: 20px;
  .svg-inline--fa {
    font-size: inherit;
  }
`;

const StWin = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #000000;
  color: orange;
  .fa-smile-wink {
    font-size: 50px;
  }
`;

const StFail = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: #b52020;
`;
////////////////////////

// 초기값 세팅 (createContext)
export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
  halted: true,
});

// 승리 조건 설정
const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  halted: true,
  gameData: {
    row: 0,
    cell: 0,
    mine: 0,
  },
  isWin: false,
};

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMAL_CELL = "NORMAL_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false,
        gameData: {
          row: action.row,
          cell: action.cell,
          mine: action.mine,
        },
        timer: 0,
        result: "",
      };

    case OPEN_CELL: {
      const tableData = [...state.tableData];
      //tableData[action.row] = [...state.tableData[action.row]];
      let openCount = 0;

      tableData.forEach((row, i) => {
        tableData[i] = [...row];
      }); // 모든 칸을 새로운 객체로 만들어 준다.
      const checked = [];
      const checkAround = (row, cell) => {
        // 상하 좌우 필터링
        if (
          row < 0 ||
          row >= tableData.length ||
          cell < 0 ||
          cell >= tableData[0].length
        ) {
          return;
        }
        // 못여는 칸 필터링
        if (
          [
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.OPENED,
            CODE.QUESTION,
            CODE.QUESTION_MINE,
          ].includes(tableData[row][cell])
        ) {
          return;
        }
        // 중복 체크
        if (checked.includes(row + "," + cell)) {
          return;
        } else {
          checked.push(row + "," + cell);
        }
        let around = []; // 주변의 상태 값을 담는다
        if (tableData[row - 1]) {
          // 양 옆이 없을 때는 undefined를 배열에 담는다
          around = around.concat([
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          ]);
        }

        around = around.concat([
          tableData[row][cell - 1],
          tableData[row][cell + 1],
        ]);

        if (tableData[row + 1]) {
          around = around.concat([
            tableData[row + 1][cell - 1],
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
          ]);
        }

        const count = around.filter((v) =>
          [CODE.FLAG_MINE, CODE.MINE, CODE.QUESTION_MINE].includes(v)
        ).length;

        if (count === 0) {
          if (row > -1) {
            const near = [];
            if (row - 1 > -1) {
              near.push([row - 1, cell - 1]);
              near.push([row - 1, cell]);
              near.push([row - 1, cell + 1]);
            }
            near.push([row, cell - 1]);
            near.push([row, cell + 1]);
            if (row + 1 < tableData.length) {
              near.push([row + 1, cell - 1]);
              near.push([row + 1, cell]);
              near.push([row + 1, cell + 1]);
            }
            near.forEach((n) => {
              if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                checkAround(n[0], n[1]);
              }
            });
          }
        }
        tableData[row][cell] = count;
      };

      checkAround(action.row, action.cell);

      tableData.forEach((tr, i) => {
        tr.forEach((td, j) => {
          if (td >= 0) {
            openCount += 1;
          }
        });
      });

      let halted = false;
      let result = "";
      let isWin = false;

      if (
        openCount ===
        state.gameData.row * state.gameData.cell - state.gameData.mine
      ) {
        halted = true;
        result = <p> {state.timer}초만에 성공하셨습니다 !! </p>;
        isWin = true;
      }

      return {
        ...state,
        tableData,
        halted,
        result,
      };
    }

    case CLICK_MINE: {
      const tableData = [...state.tableData];

      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;

      for (let i = 0; i < state.gameData.row; i++) {
        for (let j = 0; j < state.gameData.cell; j++) {
          if (
            tableData[i][j] === CODE.MINE ||
            tableData[i][j] === CODE.FLAG_MINE
          ) {
            tableData[i][j] = CODE.CLICKED_MINE;
          }
        }
      }

      return {
        ...state,
        tableData,
        halted: true,
      };
    }

    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] =
        tableData[action.row][action.cell] === CODE.MINE
          ? CODE.FLAG_MINE
          : CODE.FLAG;

      return {
        ...state,
        tableData,
      };
    }

    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] =
        tableData[action.row][action.cell] === CODE.FLAG_MINE
          ? CODE.QUESTION_MINE
          : CODE.QUESTION;

      return {
        ...state,
        tableData,
      };
    }

    case NORMAL_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] =
        tableData[action.row][action.cell] === CODE.QUESTION_MINE
          ? CODE.MINE
          : CODE.NORMAL;

      return {
        ...state,
        tableData,
      };
    }

    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1,
      };
    }

    default:
      return state;
  }
};

export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 일반
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 지뢰 있는 칸의 물음표
  FLAG_MINE: -5, // 지뢰 있는 칸의 깃발
  CLICKED_MINE: -6, // 지뢰 클릭
  OPENED: 0, // 정상적으로 오픈한 칸 -> 0 이상이면 전부 오픈
};

const plantMine = (row, cell, mine) => {
  const data = [];
  const shuffle = [];
  // 난수 생성 후 셔플 리스트에 넣어주기
  let i = 0;
  while (i < mine) {
    const chosen = Math.floor(Math.random() * (row * cell));
    if (shuffle.includes(chosen) === false) {
      shuffle.push(chosen);
      i++;
    }
  }

  // 데이타 맵을 전부 노멀로 초기화
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  // 가로 세로 계산해서 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  return data;
};
