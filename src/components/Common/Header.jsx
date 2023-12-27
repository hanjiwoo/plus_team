import React from "react";
import {
  SearchContainer,
  SearchImage,
  SearchInput,
  StBtnInputWrapper,
  StHeader,
  StLogo,
  Stbutton,
} from "./styles";
import logo from "assets/images/logo.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <StHeader>
        <Link to="/">
          <StLogo type="logo" src={logo} />
        </Link>
        <StBtnInputWrapper>
          <Stbutton>
            <Link to="/profile">
              <button>마이페이지</button>
            </Link>
            <Link to="/register">
              <button>회원가입</button>
            </Link>
            <Link to="/login">
              <button>로그인</button>
            </Link>
          </Stbutton>
          <SearchContainer>
            <SearchInput type="text" placeholder="검색어 입력" />
            <SearchImage src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" />
          </SearchContainer>
        </StBtnInputWrapper>
      </StHeader>
    </>
  );
}
