import React from "react";
import styled from "styled-components";

export default function SelectStar({ onChangeHandler, value, disabled }) {
  return (
    <StDiv>
      <select
        disabled={disabled}
        value={value}
        name="star"
        onChange={onChangeHandler}
      >
        <option name="none">별점을 선택해주세요</option>
        <option>⭐</option>
        <option>⭐⭐</option>
        <option>⭐⭐⭐</option>
        <option>⭐⭐⭐⭐</option>
        <option>⭐⭐⭐⭐⭐</option>
      </select>
    </StDiv>
  );
}

const StDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 800px;
`;
