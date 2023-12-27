import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const photo1 = "";
const photo2 = "";
const photo3 = "";
const photo4 =
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3642455%2F36424557331.20221210110320.jpg&type=sc960_832";
export const gameList = [
  { id: "1", title: "무슨무슨게임", photo: photo1 },
  { id: "2", title: "재밌는게임", photo: photo2 },
  { id: "3", title: "테트리스?게임", photo: photo3 },
  { id: "4", title: "메모리게임", photo: photo4 },
];

export default function FakeList() {
  return (
    <ListWrapper>
      {gameList.map((game) => {
        return (
          <Link to={`/detail/${game.id}`} key={game.id}>
            <List>
              <Photo>
                {" "}
                <img src={game.photo} />
              </Photo>

              <span>타이틀 : {game.title}</span>
              <span>게임아이디 : {game.id}</span>
            </List>
          </Link>
        );
      })}
    </ListWrapper>
  );
}

const ListWrapper = styled.section`
  width: 70vw;
  height: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  :hover {
    transform: scale(1.02);
  }
`;
const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: auto 5px;
  width: 200px;
  height: 300px;
  background-color: var(--yellow);
`;

const Photo = styled.figure`
  width: 100px;
  height: 100px;
  overflow: hidden;
  &img {
    width: 100%;
    height: 100%;
  }
`;
