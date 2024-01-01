import styled from "styled-components";

export const Stscreen = styled.div`
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;

  &.waiting {
    background-color: aqua;
  }

  &.ready {
    background-color: red;
    color: white;
  }

  &.now {
    background-color: greenyellow;
  }
`;
