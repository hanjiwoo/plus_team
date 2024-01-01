import React, { useRef, useState } from "react";
import circle from "../../assets/images/circle.png";
import cross from "../../assets/images/cross.png";
import styled from "styled-components";

let data = ["", "", "", "", "", "", "", "", ""];
export default function TicTacToeGame() {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let boxArray = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross}'>`;
      data[num] = "x";
      setCount(++count);
    } else {
      e.target.innerHTML = `<img src='${circle}'>`;
      data[num] = "o";
      setCount(++count);
    }
    checkWin();
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `축하합니다 <img src=${cross}> 승리 !`;
    } else {
      titleRef.current.innerHTML = `축하합니다 <img src=${circle}> 승리 !`;
    }
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe <span>게임</span>`;
    boxArray.map((e) => {
      e.current.innerHTML = "";
    });
  };
  return (
    <>
      <Container>
        <Title ref={titleRef}>Tic Tac Toe 게임</Title>
        <Board>
          <Row1>
            <Boxs
              ref={box1}
              onClick={(e) => {
                toggle(e, 0);
              }}
            ></Boxs>
            <Boxs
              ref={box2}
              onClick={(e) => {
                toggle(e, 1);
              }}
            ></Boxs>
            <Boxs
              ref={box3}
              onClick={(e) => {
                toggle(e, 2);
              }}
            ></Boxs>
          </Row1>
          <Row2>
            <Boxs
              ref={box4}
              onClick={(e) => {
                toggle(e, 3);
              }}
            ></Boxs>
            <Boxs
              ref={box5}
              onClick={(e) => {
                toggle(e, 4);
              }}
            ></Boxs>
            <Boxs
              ref={box6}
              onClick={(e) => {
                toggle(e, 5);
              }}
            ></Boxs>
          </Row2>
          <Row3>
            <Boxs
              ref={box7}
              onClick={(e) => {
                toggle(e, 6);
              }}
            ></Boxs>
            <Boxs
              ref={box8}
              onClick={(e) => {
                toggle(e, 7);
              }}
            ></Boxs>
            <Boxs
              ref={box9}
              onClick={(e) => {
                toggle(e, 8);
              }}
            ></Boxs>
          </Row3>
        </Board>
        <ResetButton
          onClick={() => {
            reset();
          }}
        >
          Reset
        </ResetButton>
      </Container>
    </>
  );
}

const Container = styled.section`
  text-align: center;
`;
const Title = styled.div`
  margin-top: 50px;
  color: white;
  font-size: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: -5px 5px #ffa732, 0px 5px #ffa732, 1px 0px #ffa732,
    0px -1px #ffa732;
  margin-bottom: 30px;
  gap: 30px;

  & img {
    height: 50px;
  }
`;

const ResetButton = styled.button`
  width: 250px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 50px;
  background: var(--yellow);
  font-size: 26px;
  color: white;
  margin-bottom: 50px;
`;

const Boxs = styled.div`
  display: flex;
  height: 180px;
  width: 180px;
  background: var(--green);
  border: 4px solid white;
  cursor: pointer;
  & img {
    margin: 30px 30px;
  }
`;

const Board = styled.div`
  height: 600px;
  width: 564px;
  display: flex;
  margin: auto;
`;

const Row1 = styled.div``;

const Row2 = styled.div``;

const Row3 = styled.div``;
