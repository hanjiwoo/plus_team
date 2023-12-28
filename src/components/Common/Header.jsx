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
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/modules/authSlice';
import { useNavigate } from "react-router-dom";


export default function Header() {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate("/Signin")
  }

  const navigateregister = () => {
    navigate("/Register")
  }
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  console.log(isLogin)

  return (
    <>
      <StHeader>
        <Link to="/">
          <StLogo type="logo" src={logo} />
        </Link>
        <StBtnInputWrapper>
          <Stbutton>
            {isLogin ? (
              <>
                <Link to="/profile">
                  <button>마이페이지</button>
                </Link>
                  <button
                    size="large"
                    onClick={() => {
                      alert('정말 로그아웃 하시겠습니까?');
                      dispatch(logout());
                      navigate('/');
                    }}>
                    로그아웃
                  </button>
              </>
            ):(
              <>
                  <button size="large" onClick={navigateregister}>회원가입</button>
                  <button size="large" onClick={navigateLogin}>로그인</button>
              </>
            )}
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
