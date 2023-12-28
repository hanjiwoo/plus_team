import React, { useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import Timer from "./Timer";

let array = [];
for (let i = 1; i <= 25; i++) {
  array.push(i);
}

function OneToFifty() {
  const [numbers, setNumbers] = useState(array);
  const [gameFlag, setGameFlag] = useState(false);
  const [current, setCurrent] = useState(1);

  const handleClick = (num) => {
    if (num === current && gameFlag) {
      if (num === 50) {
        // 게임 성공 시, alert
        console.log("Success");
        //console.log(record.current / 1000);
        endGame();
      }
      const index = numbers.indexOf(num);
      setNumbers((numbers) => [
        ...numbers.slice(0, index),
        num < 26 ? num + 25 : 0,
        ...numbers.slice(index + 1),
      ]);
      setCurrent((current) => current + 1);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const startGame = () => {
    setNumbers(shuffleArray(array));
    setCurrent(1);
    setGameFlag(true);
  };

  const endGame = () => {
    setGameFlag(false);
  };

  return (
    <Container>
      <StDiv>
        {gameFlag ? <Timer /> : <StBtn onClick={startGame}>Start</StBtn>}
      </StDiv>
      <Board numbers={numbers} handleClick={handleClick}></Board>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const StDiv = styled.div`
  display: flex;
  width: 100%;
  padding-top: 20px;
  justify-content: center;
`;

const StBtn = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 50px;
  font-size: 30px;
  font-weight: bold;
  color: white;
  background-color: lightpink;
  border: none;
  box-shadow: 5px 5px 5px grey;
  border-radius: 10px;
`;

export default OneToFifty;
