import React from "react";
import { useNavigate } from "react-router-dom";
import { List, StTitle, Photo, StText, AllSlide } from "./styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LikeBtn from "./LikeBtn";
import memory_src from "../../assets/images/memorygame.jpg";
import speed_src from "../../assets/images/speedgame.jpg";
import tic_src from "../../assets/images/tictactoe.jpg";

const photo1 = speed_src;
const photo3 = tic_src;
const photo4 = memory_src;
export const gameList = [
  {
    id: "1",
    title: "순발력게임",
    photo: photo1,
    content: "누구보다 빠른 속도를 보여주세요!",
    explain: `1 ~ 50 까지의 숫자가 무작위로 배치됩니다. 
      숫자를 순서대로 다 누르면 성공 ! 
      누구보다 빠른 속도를 보여주세요 !`,
  },
  {
    id: "2",
    title: "",
    photo: "",
    content: "",
    explain: ``,
  },
  {
    id: "3",
    title: "Tic Tac Toe",
    photo: photo3,
    content: "친구와 둘이서 Tic Tac Toe! ",
    explain: `오목과 유사한 형태의 전략적 보드 게임 !
    먼저 같은 그림으로 한 줄을 완성하면 승리입니다.
    친구와 둘이서 Tic Tac Toe ! `,
  },
  {
    id: "4",
    title: "메모리게임",
    photo: photo4,
    content: "포켓몬의 짝을 찾아주세요!",
    explain: `뒤집어져 있는 카드를 하나씩 열어보면서 
      같은 그림의 카드를 맞춰보세요. 
      포켓몬의 짝을 찾아주세요 !`,
  },
  {
    id: "5",
    title: "",
    photo: "",
    content: "",
    explain: ``,
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
              key={game.id}
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
