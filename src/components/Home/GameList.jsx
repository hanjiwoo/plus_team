import React from "react";
import { useNavigate } from "react-router-dom";
import { List, StTitle, Photo, StText, AllSlide } from "./styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LikeBtn from "./LikeBtn";
import memory_src from "../../assets/images/memorygame.jpg";
import speed_src from "../../assets/images/speedgame.jpg";

const photo1 = speed_src;
const photo2 =
  "https://c2.img.netmarble.kr/web/6N/2011/02/2140/%EA%B0%9C%EB%93%9C%EB%A6%BD_%EC%9A%B0%EA%B1%B0%EC%A7%80%EA%B5%AD.jpg";
const photo4 = memory_src;
export const gameList = [
  {
    id: "1",
    title: "순발력게임",
    photo: photo1,
    content: "누구보다 빠른 속도를 보여주세요!",
    explain: `1 ~ 50 까지의 숫자가 무작위로 배치됩니다. 
      1부터 50까지 순서대로 숫자를 누르세요. 
      50까지 다 누르면 성공 ! 
      누구보다 빠른 속도를 보여주세요 !`,
  },
  {
    id: "2",
    title: "캐치마인드",
    photo: photo2,
    content: "당신의 창의력을 발휘해보세요!",
    explain: "",
  },
  {
    id: "4",
    title: "메모리게임",
    photo: photo4,
    content: "포켓몬의 짝을 찾아주세요!",
    explain: `뒤집어져 있는 카드를 하나씩 열어보면서 
      순서를 기억해서 같은 그림의 카드를 맞춰보세요. 
      당신의 엄천난 기억력을 보여주세요!`,
  },
];

export default function GameList() {
  const navigate = useNavigate();
  const pageMover = (event, addr) => {
    if (event.target.name === "like") return;
    navigate(addr);
  };

  return (
    <AllSlide>
      <Slider {...settings}>
        {gameList.map((game) => {
          return (
            <div
              onClick={(event) => pageMover(event, `/detail/${game.id}`)}
              /*  to={`/detail/${game.id}`} */
              key={game.id}
              style={{ textDecoration: "none" }}
            >
              <List>
                <StTitle>{game.title}</StTitle>
                <LikeBtn name="like" id={game.id} />
                <Photo>
                  <img src={game.photo} alt={game.title} />
                </Photo>
                <StText>{game.content}</StText>
              </List>
            </div>
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
