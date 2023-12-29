import React, { useState } from 'react';
import styled from 'styled-components';
import { auth } from '../../shared/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { useDispatch } from "react-redux";
import authSlice, { login } from '../../redux/modules/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

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
            password,
          );
          setEmail("");
          setPassword("");
          dispatch(login({
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            uid: userCredential.user.uid,
            photoURL : userCredential.user.photoURL
          }));
          Swal.fire('로그인 성공', userCredential.user.displayName+ '님 RE-PLAY의 오신걸 환영합니다.', 'success')
          navigate('/');

          // console.log(userCredential);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("error with LogIn", errorCode, errorMessage);
          Swal.fire('로그인 실패', '등록되지 않은 회원이거나 유효하지 않은 이메일입니다.', 'error');
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
          dispatch(login({
            email: result.email,
            displayName: result.displayName,
            uid: result.uid,
            photoURL : result.photoURL
          }));
          Swal.fire('로그인 성공', 'RE-PLAY의 오신걸 환영합니다. ', 'success');
          navigate('/');

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
                value={email} onChange={onChange} />
                <Input
                type="password"
                name="password"
                placeholder='비밀번호 (6~10글자)'
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
)
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: #ffffff;
  outline-color: #ffffff;
  border-radius: 12px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 400px;
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
  background-color: ${(props) => (props.disabled ? "lightgray" : "#FF6000")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: #ffffff;
  border: none;
  margin-top: 4px;
  margin-bottom: 2px;
  padding: 12px 0;
  font-size: 18px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "lightgray" : "#6b6b6b")};
  }
`;

const GoogleButton = styled.button`
  background-color: ${(props) => (props.disabled ? "lightgray" : "#FFA559")};
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  color: #ffffff;
  border: none;
  margin-top: 4px;
  margin-bottom: 2px;
  padding: 12px 0;
  font-size: 18px;

  &:hover {
    background-color: ${(props) => (props.disabled ? "lightgray" : "#6b6b6b")};
  }
`;
