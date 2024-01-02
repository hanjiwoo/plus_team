import React, { useEffect, useState } from "react";
import phi from "../../assets/images/phi.jpg";
import Mu from "../../assets/images/mu.jpg";
import ggo from "../../assets/images/ggo.jpg";
import pha from "../../assets/images/pha.jpg";
import isang from "../../assets/images/isang.jpg";
import ghi from "../../assets/images/ghi.jpg";
import ing from "../../assets/images/ing.jpg";
import eve from "../../assets/images/eve.jpg";

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
      <Text>
        <p>뒤집은 횟수 : {turns}</p>
        <button onClick={shuffleCards}>RESET</button>
      </Text>

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
  margin-bottom: 30px;
`;

const Grid = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  font-size: 20px;

  button {
    cursor: pointer;
    background-color: var(--yellow);
    margin-top: 15px;
    border-radius: 5px;
  }
`;
