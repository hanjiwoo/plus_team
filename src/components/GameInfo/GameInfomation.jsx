import { useInfiniteQuery, useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { getGames } from "./queryFn";
import styled from "styled-components";

export default function GameInfomation() {
  const {
    data: games,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
    // getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  //   console.log(games, " 게임스");

  if (isLoading) {
    return <>로딩중...</>;
  }

  return (
    <Contend>
      {games.map((game) => {
        return (
          <GameWrapper key={game.id}>
            <ImgWrapper>
              {<img src={game.background_image} alt="게임이미지" />}
            </ImgWrapper>
            <TextWrapper>
              <span>타이틀 : {game.name}</span>
              <span>플랫폼 : {game.platforms[0].platform.name}</span>
              <span>판매처 : {game.stores[0].store.name}</span>
              <span>발매일 : {game.released}</span>
              <span>평점 : {game.rating}</span>
              <span>순위 : {game.rating_top}</span>
              <span>장르 : {game.genres[0].name}</span>
            </TextWrapper>
          </GameWrapper>
        );
      })}
    </Contend>
  );
}
const Contend = styled.section`
  margin: 100px 100px;
`;

const GameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
`;
const ImgWrapper = styled.figure`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 5%;

  & img {
    width: 100%;
    height: 100%;
  }
`;

const TextWrapper = styled.div`
  margin: 10px 30px;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  & span {
    font-size: 25px;
  }
`;
