import styled from "styled-components";

export const StContainer = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Stscreen = styled.div`
  margin-top: 20px;
  width: 600px;
  height: 500px;
  display: flex;
  justify-content: center;
  text-align: center;
  border-radius: 20px;
  user-select: none;

  &.waiting {
    background-color: lightgray;
    font-size: 30px;
  }

  &.ready {
    background-color: gray;
    color: white;
    font-size: 30px;
  }

  &.now {
    background-color: var(--green);
    color: white;
    font-size: 30px;
  }
`;

export const StText = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StTime = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
`;

export const StBtn = styled.button`
  cursor: pointer;
  width: 100px;
  height: 30px;
  background-color: var(--yellow);
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 20px;
  color: white;
  border: none;
  padding: 5px;
  align-items: center;
  display: flex;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }
`;

export const StContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 600px;
  height: 50px;
`;
