import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { List, Photo, StText, AllSlide } from "./styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const photo1 = "";
const photo2 = "";
const photo4 =
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3642455%2F36424557331.20221210110320.jpg&type=sc960_832";
export const gameList = [
  { id: "1", title: "순발력게임", photo: photo1 },
  { id: "2", title: "캐치마인드", photo: photo2 },
  { id: "4", title: "메모리게임", photo: photo4 },
];

export default function GameList() {
  return (
    <AllSlide>
      <Slider {...settings}>
        {gameList.map((game) => {
          return (
            <Link to={`/detail/${game.id}`} key={game.id}>
              <List>
                <Photo>
                  <img src={game.photo} alt={game.title} />
                </Photo>
                <StText>{game.title}</StText>
              </List>
            </Link>
          );
        })}
      </Slider>
    </AllSlide>
  );
}
const settings = {
  className: "slider variable-width",
  dots: true,
  arrows: true,
  infinite: true,
  speed: 1000,
  centerMode: true,
  slidesToShow: 1,
  slidesToScroll: 2,
  variableWidth: true,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};
