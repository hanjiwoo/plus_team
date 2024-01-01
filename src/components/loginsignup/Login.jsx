import React, { useState } from "react";
import styled from "styled-components";
import { auth } from "../../shared/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import authSlice, { login } from "../../redux/modules/authSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import heart from "../../assets/images/heart.png";
import erroricon from "../../assets/images/erroricon.png";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setEmail("");
      setPassword("");
      dispatch(
        login({
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          uid: userCredential.user.uid,
          photoURL: userCredential.user.photoURL,
        })
      );
      Swal.fire({
        title: "로그인 성공",
        text: userCredential.user.displayName + `님 환영합니다!`,
        confirmButtonColor: '#20b2aa',
        confirmButtonText: '확인',
        imageUrl: heart,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: "Custom image",
      });
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with LogIn", errorCode, errorMessage);
      Swal.fire({
        title: "로그인 실패",
        text: "이메일 및 비밀번호를 다시 확인 해 주시기 바랍니다.",
        confirmButtonColor: '#ef4040',
        confirmButtonText: '확인',
        imageUrl: erroricon,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: "Custom image"
      });
    }
  };

  const GoogleLogin = async (e) => {
    e.preventDefault();

    const Provider = new GoogleAuthProvider();
    Provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      const result = await signInWithPopup(auth, Provider);
      dispatch(
        login({
          email: result.user.email,
          displayName: result.user.displayName,
          uid: result.user.uid,
          photoURL: result.user.photoURL,
        })
      );
      Swal.fire({
        title: "로그인 성공",
        text: result.user.displayName + `님 환영합니다!`,
        confirmButtonColor: '#20b2aa',
        confirmButtonText: '확인',
        imageUrl: heart,
        imageWidth: 130,
        imageHeight: 130,
        imageAlt: "Custom image",
      });
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with googleLogIn", errorCode, errorMessage);
    }
  };

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <Container>
      <Form onSubmit={localLogin}>
        <Title>로그인</Title>
        <InputContainer>
          <Input
            type="email"
            name="email"
            placeholder="이메일 (6~30글자)"
            value={email}
            onChange={onChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호 (6~10글자)"
            value={password}
            onChange={onChange}
          />
        </InputContainer>
        <ButtonContainer>
          <Button
            disabled={
              email === "" ||
              email.length < 6 ||
              email.length > 30 ||
              password === "" ||
              password.length < 6 ||
              password.length > 10
            }
          >
            로그인
          </Button>
          <GoogleButton type="button" onClick={GoogleLogin}>
            Google 로그인
          </GoogleButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 130px;
`;

const Form = styled.form`
  background-color: #ffffff;
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 380px;
`;

const Title = styled.h1`
  color: #454545;
  font-size: 36px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #999;
  width: 100%;
  display: block;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 20px 0;
  outline: none;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  background-color: ${(props) => (props.disabled ? "lightgray" : "#20b2aa")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: #ffffff;
  border: none;
  margin-top: 4px;
  margin-bottom: 2px;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 10px;
`;

const GoogleButton = styled.button`
  color: #ffffff;
  border: none;
  cursor: pointer;
  margin-top: 4px;
  margin-bottom: 2px;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 10px;
  &:hover{
    background-color: #ffc436;
  }
`;
