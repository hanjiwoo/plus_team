import styled from "styled-components";

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  margin: 20px;
  width: 600px;
  height: 550px;
  background-color: var(--yellow);

  &:hover {
    transform: scale(1.05);
    box-shadow: 2px 2px 2px 2px grey;
  }
`;

export const Photo = styled.figure`
  width: 400px;
  height: 350px;
  border-radius: 20px;
  & img {
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: 20px;
  }
`;

export const StTitle = styled.div`
  margin: 25px 0px 0px 0px;
  font-size: 40px;
  color: white;
  text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
`;

export const StText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 25px;
  font-size: 25px;
  color: var(--yellow);
  text-shadow: -1px 0px white, 0px 1px white, 1px 0px white, 0px -1px white;
`;

export const AllSlide = styled.div`
  height: 600px;
  margin: 100px 0px;

  .slick-prev:hover:before,
  .slick-prev:focus:before,
  .slick-next:hover:before,
  .slick-next:focus:before {
    opacity: 0.5;
  }

  .slick-prev:before,
  .slick-next:before {
    height: 0;
    font-size: 70px;
    color: white;
    opacity: 0.6;
  }

  .slick-prev {
    left: 10px;
    z-index: 10;
  }
  [dir="rtl"] .slick-prev {
    right: -25px;
    left: auto;
  }

  .slick-next {
    right: 70px;
  }
  [dir="rtl"] .slick-next {
    right: auto;
    left: -25px;
  }

  .slick-dots {
    bottom: -50px;
  }

  .slick-dots li {
    margin: -20px 15px;
  }

  .slick-dots li button:before {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: var(--yellow);
    text-align: center;
    content: "";
  }

  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: black;
  }
`;


export const Nikname = styled.div`
`