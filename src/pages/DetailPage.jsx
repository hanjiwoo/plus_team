import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { gameList } from "../components/Home/GameList";
import PostList from "../components/detail/PostList";

export default function DetailPage() {
  const { id } = useParams();

  const [myGame] = gameList.filter((game) => {
    return game.id === id;
  });
  // console.log(myGame);
  const navigate = useNavigate();
  const moveToGame = () => {
    let addr = "";
    switch (id) {
      case "1":
        addr = "/speedgame";
        break;
      case "3":
        addr = "/tictactoe";
        break;
      case "4":
        addr = "/memorycard";
        break;
      default:
        addr = "/";
    }
    navigate(addr);
  };

  return (
    <StBox>
      <Content>
        <StH1>{myGame.title}</StH1>
        <StP>{myGame.explain}</StP>
        <StBtn onClick={moveToGame}>GO TO GAME</StBtn>
        <PostList id={id} />
      </Content>
    </StBox>
  );
}

const StBox = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: aliceblue;
`;

const Content = styled.div`
  width: 900px;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  /* border: 1px solid black; */
  border-radius: 20px;
`;

const StH1 = styled.h1`
  font-size: 50px;
`;

const StP = styled.p`
  font-size: 20px;
  width: 800px;
  white-space: pre-line;
  text-align: center;
  line-height: 1.5em;
  margin: 30px;
`;

const StBtn = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: #ffa732;
  font-size: 20px;
  color: white;
`;
