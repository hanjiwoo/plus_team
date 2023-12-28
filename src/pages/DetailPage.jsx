import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { gameList } from "../components/Home/GameList";
import PostList from "../components/detail/PostList";
import LikeBtn from "../components/detail/LikeBtn";

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
      case "4":
        addr = "/memorycard";
        break;
      default:
        addr = "/";
    }
    navigate(addr);
  };

  return (
    <Content>
      <Photo>
        <img src={myGame.photo} alt="게임포토" />
      </Photo>
      <button onClick={moveToGame}>게임하러가기</button>
      <LikeBtn id={id} />
      <PostList id={id} />
    </Content>
  );
}

const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Photo = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  overflow: hidden;
  &img {
    width: 100%;
    height: 100%;
  }
`;
