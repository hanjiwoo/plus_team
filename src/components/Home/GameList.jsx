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
import minesearch_src from "../../assets/images/minesearch.jpg";

const photo1 = memory_src;
const photo2 = minesearch_src;
const photo3 = tic_src;
const photo4 = speed_src;
export const gameList = [
  {
    id: "1",
    title: "메모리게임",
    photo: photo1,
    content: "포켓몬의 짝을 찾아주세요!",
    explain: `뒤집어져 있는 카드를 하나씩 열어보면서 
      같은 그림의 카드를 맞춰보세요. 
      포켓몬의 짝을 찾아주세요 !`,
  },
  {
    id: "2",
    title: "지뢰찾기",
    photo: photo2,
    content: "펑 ~~! 지뢰를 피해 게임을 성공하세요!",
    explain: `무작위로 지뢰가 깔려 있습니다.
    지뢰가 없는 칸을 열면 숫자가 적혀 있습니다.
    이 숫자는 주변에 있는 지뢰의 개수를 의미합니다.
    지뢰를 피해서 모든 칸을 열면 성공 !
    가로, 세로 칸 수와 지뢰의 개수를 직접 선택하여 여러 난이도를 즐겨보세요 !`,
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
    title: "순발력게임",
    photo: photo4,
    content: "누구보다 빠른 속도를 보여주세요!",
    explain: `1 ~ 50 까지의 숫자가 무작위로 배치됩니다. 
        숫자를 순서대로 다 누르면 성공 ! 
        누구보다 빠른 속도를 보여주세요 !`,
  },
  {
    id: "5",
    title: "반응속도게임",
    photo: photo4,
    content: "당신의 반응 속도를 보여주세요!",
    explain: `1 ~ 50 까지의 숫자가 무작위로 배치됩니다. 
        숫자를 순서대로 다 누르면 성공 ! 
        당신의 반응 속도를 보여주세요 !`,
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
  autoplaySpeed: 3500,
  pauseOnHover: true,
};
