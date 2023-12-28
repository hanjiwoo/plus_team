import React from "react";
import { Link } from "react-router-dom";
import { List, StTitle, Photo, StText, AllSlide } from "./styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const photo1 =
  "https://img.gamen.com/@files/gamefile/2021/20210525/read_img_1621919018.png";
const photo2 =
  "https://c2.img.netmarble.kr/web/6N/2011/02/2140/%EA%B0%9C%EB%93%9C%EB%A6%BD_%EC%9A%B0%EA%B1%B0%EC%A7%80%EA%B5%AD.jpg";
const photo4 =
  "https://search.pstatic.net/common/?src=http%3A%2F%2Fshopping.phinf.naver.net%2Fmain_3642455%2F36424557331.20221210110320.jpg&type=sc960_832";
export const gameList = [
  {
    id: "1",
    title: "순발력게임",
    photo: photo1,
    content: "누구보다 빠른 속도를 보여주세요!",
  },
  {
    id: "2",
    title: "캐치마인드",
    photo: photo2,
    content: "당신의 창의력을 발휘해보세요!",
  },
  {
    id: "4",
    title: "메모리게임",
    photo: photo4,
    content: "포켓몬의 짝을 찾아주세요!",
  },
];

export default function GameList() {
  return (
    <AllSlide>
      <Slider {...settings}>
        {gameList.map((game) => {
          return (
            <>
              <Link
                to={`/detail/${game.id}`}
                key={game.id}
                style={{ textDecoration: "none" }}
              >
                <List>
                  <StTitle>{game.title}</StTitle>
                  <Photo>
                    <img src={game.photo} alt={game.title} />
                  </Photo>
                  <StText>{game.content}</StText>
                </List>
              </Link>
            </>
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
  autoplaySpeed: 4000,
  pauseOnHover: true,
};
