import React from "react";
import { StBtnInputWrapper, StHeader, StLogo, Stbutton } from "./styles";
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
  console.log(isLogin);

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
                <Link to="/mypage">
                  <button>마이페이지</button>
                </Link>
                <button
                  size="large"
                  onClick={() => {
                    Swal.fire({
                      title: "로그아웃",
                      text: "다음에도 저희 RE-PLAY를 이용해주세요 !",
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
