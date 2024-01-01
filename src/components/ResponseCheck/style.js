import styled from "styled-components";

export const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Stscreen = styled.div`
  margin: 50px;
  width: 600px;
  height: 400px;
  display: flex;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  user-select: none;

  &.waiting {
    background-color: #84c7fa;
    font-size: 40px;
  }

  &.ready {
    background-color: var(--yellow);
    color: white;
    font-size: 40px;
  }

  &.now {
    background-color: var(--green);
    font-size: 40px;
  }
`;

export const StText = styled.div`
  margin: 20px;
`;

export const StTime = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  button {
    cursor: pointer;
    width: 80px;
    height: 40px;
    background-color: var(--yellow);
    margin-top: 15px;
    border-radius: 5px;
    font-size: 20px;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
