import React, { useState, useCallback, useContext, memo } from "react";
import { TableContext, START_GAME } from "./MineSearch";
import styled from "styled-components";

const Form = memo(() => {
  const [row, setRow] = useState(15); // 세로
  const [cell, setCell] = useState(15); // 가로
  const [mine, setMine] = useState(30); // 지뢰 개수
  const { dispatch } = useContext(TableContext);

  // useCallback --> 불필요한 렌더링 방지
  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine });
  }, [row, cell, mine]);

  return (
    <StDiv>
      <StInput
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      />
      <StInput
        type="number"
        placeholder="가로"
        value={cell}
        onChange={onChangeCell}
      />
      <StInput
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={onChangeMine}
      />
      <StBtn onClick={onClickBtn}>시작</StBtn>
    </StDiv>
  );
});

export default Form;

const StDiv = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: center;
`;

const StInput = styled.input`
  width: 100px;
  height: 30px;
  font-size: 22px;
  margin-right: 22px;
  text-align: center;
  border: 0;
  text-indent: 17px;
  border-bottom: 3px solid #000;
`;

const StBtn = styled.button`
  width: 100px;
  font-size: 17px;
  font-weight: bold;
`;
