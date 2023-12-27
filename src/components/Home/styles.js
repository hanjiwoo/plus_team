import styled from "styled-components";

export const ListWrapper = styled.section`
  width: 70vw;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  transition: all 0.2s;
  :hover {
    transform: scale(1.02);
  }
`;

export const List = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: auto 5px;
  width: 200px;
  height: 300px;
  background-color: var(--yellow);
`;

export const Photo = styled.figure`
  width: 100px;
  height: 100px;
  overflow: hidden;
  &img {
    width: 100%;
    height: 100%;
  }
`;

export const StText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: 20px;
  color: black;
`;

export const AllSlide = styled.div`
  height: 450px;
  margin: 50px 0;

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
    opacity: 0.3;
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
    background-color: gray;
    text-align: center;
    content: "";
  }

  .slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: black;
  }
`;
