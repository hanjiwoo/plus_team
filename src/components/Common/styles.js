import styled from "styled-components";

export const StMain = styled.main`
  min-height: 100dvh;
`;

// header.jsx
export const StHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--red);
  color: black;
`;

export const StLogo = styled.img`
  position: relative;
  background-image: url("assets/images/logo.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 200px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

export const StBtnInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
  gap: 30px;
`;

export const Stbutton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  background: transparent;
  border: none;
  cursor: pointer;

  button {
    cursor: pointer;
    width: 120px;
    height: 40px;
    font-size: 18px;
    background-color: #ffc436;
    color: white;
    border: none;
    border-radius: 10px;

    &:hover {
      transform: scale(1.05);
    }
  }
`;
