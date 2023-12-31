import React, { useContext, useCallback, memo } from "react";
import { CODE, TableContext } from "./MineSearch";
import styled from "styled-components";
import {
  OPEN_CELL,
  CLICK_MINE,
  FLAG_CELL,
  QUESTION_CELL,
  NORMAL_CELL,
} from "./MineSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faFlag, faQuestion } from "@fortawesome/free-solid-svg-icons";

const Td = memo(({ rowIndex, cellIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][cellIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, cell: cellIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][cellIndex], halted]);

  const onRightClickTd = useCallback(
    (e) => {
      e.preventDefault(); // 디폴트로 메뉴가 뜨는것을 방지

      if (halted) {
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.OPENED:
          return;
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          dispatch({ type: NORMAL_CELL, row: rowIndex, cell: cellIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted]
  );

  return (
    <StTd
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {getTdText(tableData[rowIndex][cellIndex])}
    </StTd>
  );
});

export default Td;

const StTd = styled.td`
  border: 5px solid black;
  width: 40px;
  height: 40px;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
`;

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.CLICKED_MINE:
      return {
        background: "red",
      };
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yellow",
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "green",
      };
    default:
      return {
        background: "white",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "";
    case CODE.CLICKED_MINE:
      const boom = <FontAwesomeIcon icon={faBomb} />;
      return boom;
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      const flag = <FontAwesomeIcon icon={faFlag} />;
      return flag;
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      const question = <FontAwesomeIcon icon={faQuestion} />;
      return question;
    default:
      return code || "";
  }
};
