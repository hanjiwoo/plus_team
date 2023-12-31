import React, { useContext, memo } from "react";
import { TableContext } from "./MineSearch";
import Tr from "./Tr";
import styled from "styled-components";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);

  return (
    <StTable>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr rowIndex={i} />
        ))}
    </StTable>
  );
});

export default Table;

const StTable = styled.table`
  border-collapse: collapse;
  margin: 20px auto;
`;
