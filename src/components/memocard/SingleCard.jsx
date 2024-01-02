import React from "react";
import ball from "../../assets/images/ball.png";
import styled, { css } from "styled-components";
export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <Card className="card">
      <ImgWrpper flipped={flipped}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={ball}
          onClick={handleClick}
          alt="card back"
        />
      </ImgWrpper>{" "}
    </Card>
  );
}

const Card = styled.div`
  position: relative;

  & img {
    width: 150px;
    height: 150px;
    display: block;
    border: 3px solid black;
    border-radius: 6px;
  }
`;

const ImgWrpper = styled.div`
  ${(props) =>
    props.flipped
      ? css`
          .front {
            transform: rotateY(0deg);
            transition-delay: 0.2s;
          }
          .back {
            transform: rotateY(90deg);
            transition-delay: 0s;
            display: none;
          }
        `
      : css`
          .front {
            transform: rotateY(90deg);
            transition: all ease-in 0.2s;
            position: absolute;
          }
          .back {
            transition: all ease-in 0.2s;
            transition-delay: 0.2s;
          }
        `}
`;
