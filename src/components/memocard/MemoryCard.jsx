import React, { useEffect, useState } from "react";
import phi from "../../MemoryCardAsset/피카츄.jpg";
import Mu from "../../MemoryCardAsset/뮤.jpg";
import ggo from "../../MemoryCardAsset/꼬부기.jpg";
import pha from "../../MemoryCardAsset/파이리.jpg";
import isang from "../../MemoryCardAsset/이상해씨.jpg";
import ghi from "../../MemoryCardAsset/지라치.jpg";
import ing from "../../MemoryCardAsset/잉어킹.jpg";
import eve from "../../MemoryCardAsset/이브이.jpg";

import styled from "styled-components";
import SingleCard from "./SingleCard";

export default function MemoryCard() {
  const cardImages = [
    { src: ggo, matched: false },
    { src: phi, matched: false },
    { src: Mu, matched: false },
    { src: pha, matched: false },
    { src: isang, matched: false },
    { src: ghi, matched: false },
    { src: ing, matched: false },
    { src: eve, matched: false },
  ];

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  //카드섞기
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };
  //선택 조절
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };
  //카드 두개 비교
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prev) => prev + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <Content>
      <h1>메모리 게임</h1> <p>횟수 : {turns}</p>
      <button onClick={shuffleCards}>뉴게임</button>
      <Grid>
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              handleChoice={handleChoice}
              disabled={disabled}
            />
          );
        })}
      </Grid>
    </Content>
  );
}
const Content = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;
