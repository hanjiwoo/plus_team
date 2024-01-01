import React from "react";
import {
  StBtnInputWrapper,
  StHeader,
  StLogo,
  Stbutton,
  StText,
} from "./styles";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo1 from "../../assets/images/logo 1.png";

export default function Header() {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/Signin");
  };

  const navigateregister = () => {
    navigate("/Register");
  };

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authSlice.isLogin);
  const displayName = useSelector((state) => state.authSlice?.displayName);
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
                <StText>{displayName} 님 안녕하세요 !</StText>
                <button
                  size="large"
                  onClick={() => {
                    Swal.fire({
                      title: "로그아웃",
                      text: "다음에도 RE-PLAY에 와주세요 !",
                      confirmButtonColor: "#20b2aa",
                      confirmButtonText: "확인",
                      imageUrl: logo1,
                      imageWidth: 130,
                      imageHeight: 130,
                      imageAlt: "Custom image",
                    });
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <button size="large" onClick={navigateregister}>
                  회원가입
                </button>
                <button size="large" onClick={navigateLogin}>
                  로그인
                </button>
              </>
            )}
          </Stbutton>
        </StBtnInputWrapper>
      </StHeader>
    </>
  );
}
