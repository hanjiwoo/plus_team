import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

function Login() {
  const location = useLocation();
  console.log(location)
  const IsLogin = location.state.IsLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwdCheck, setPasswdCheck] = useState("");
  const [nickName, setNickName] = useState("");
  const [isLogin, setIsLogin] = useState(IsLogin);

  useEffect(() => {
    // 
  }, []);

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setEmail("");
      setPassword("");
      console.log(userCredential);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with LogIn", errorCode, errorMessage);
      alert("등록되지 않은 회원이거나 유효하지 않은 이메일입니다.");
    }
  };

  const signUp = async (e) => {
    try {
      // Firebase Authentication을 사용하여 계정 생성
      e.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      updateProfile(userCredential.user, {
        displayName: nickName,
      });
      await auth.signOut();
      setEmail("");
      setPassword("");
      setPasswdCheck("");
      setNickName("");
      toggleonHandler();
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.errorMessage;
      console.log("error with signUp", errorCode, errorMessage);
      alert("중복이거나 사용할 수 없는 이메일 입니다.");
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
      console.log(result.user);
      console.log(result);
      console.log(result.user.displayName);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error with googleLogIn", errorCode, errorMessage);
    }
  };

  const togglehandle = () => {
    setEmail("");
    setPassword("");
    setIsLogin(false);
  };

  const toggleonHandler = () => {
    setEmail("");
    setPassword("");
    setPasswdCheck("");
    setNickName("");
    setIsLogin(true);
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
    if (name === "nickname") {
      setNickName(value);
    }
  };

  return (
    <Container>
      {isLogin ? (
        <Form onSubmit={login}>
          <>
            <Title>Login</Title>

            <InputContainer>
              <Input name="email" value={email} onChange={onChange} />
              <Input
                type="password"
                name="password"
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
              <SubButton>
                <span onClick={() => togglehandle()}>회원가입</span>
              </SubButton>
            </ButtonContainer>
          </>
        </Form>
      ) : (
        <Form onSubmit={signUp}>
          <>
            <Title>Signup</Title>
            <InputContainer>
              <Input
                type="email"
                value={email}
                name="email"
                placeholder="  이메일 (6~30글자)"
                minLength={6}
                maxLength={30}
                onChange={onChange}
                required
              />
              <Input
                type="password"
                value={password}
                name="password"
                placeholder="  비밀번호 (6~10글자)"
                minLength={6}
                maxLength={10}
                onChange={onChange}
                required
              />
              <Input
                type="password"
                value={passwdCheck}
                name="passwdCheck"
                placeholder="  비밀번호 확인(6~10글자)"
                minLength={6}
                maxLength={10}
                onChange={(e) => setPasswdCheck(e.target.value)}
                required
              />
              {passwdCheck !== "" && password !== passwdCheck && (
                <P>비밀번호가 일치하지 않습니다.</P>
              )}
              <Input
                type="text"
                value={nickName}
                name="nickname"
                placeholder="  닉네임 (2~10글자)"
                minLength={2}
                maxLength={10}
                onChange={onChange}
                required
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
                  password.length > 10 ||
                  passwdCheck === "" ||
                  passwdCheck.length < 6 ||
                  passwdCheck.length > 10 ||
                  nickName === "" ||
                  nickName.length < 2 ||
                  nickName.length > 10 ||
                  password !== passwdCheck
                }
              >
                회원가입
              </Button>
              <SubButton>
                <span onClick={() => toggleonHandler()}>로그인으로 이동</span>
              </SubButton>
            </ButtonContainer>
          </>
        </Form>
      )}
    </Container>
  );
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

const Title = styled.h1`
  color: #454545;
  font-size: 36px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
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

const SubButton = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 24px;
  & span {
    color: gray;
    user-select: none;
    cursor: pointer;

    &:hover {
      color: white;
      font-weight: bold;
    }
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

const P = styled.p`
  font-size: 15px;
  color: #ffa559;
`;

export default Login;
