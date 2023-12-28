import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { gameList } from "../components/Home/GameList";
import PostList from "../components/memocard/PostList";

export default function DetailPage() {
  const [like, setLIke] = useState(false);
  const { id } = useParams();

  const [myGame] = gameList.filter((game) => {
    return game.id === id;
  });
  // console.log(myGame);
  const navigate = useNavigate();
  const moveToGame = () => {
    let addr = "";
    switch (id) {
      case "4":
        addr = "/memorycard";
        break;
      default:
        addr = "/";
    }
    navigate(addr);
  };

  const likeBTN = () => {
    setLIke(!like);
  };
  return (
    <Content>
      <Photo>
        <img src={myGame.photo} alt="게임포토" />
      </Photo>
      <button onClick={moveToGame}>게임하러가기</button>
      <LikeButton $like={like.toString()} onClick={likeBTN}>
        좋아요 버튼
      </LikeButton>
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

const LikeButton = styled.button`
  /* width: 50px;
  height: 50px; */
  color: white;
  border-radius: 50%;

  ${(props) => {
    switch (props.$like) {
      case "true":
        return css`
          background-color: black;
        `;
      default:
        return css`
          background-color: red;
        `;
    }
  }}
`;
