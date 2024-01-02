import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth } from "../../shared/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import heart from "../../assets/images/heart.png";
import erroricon from "../../assets/images/erroricon.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwdCheck, setPasswdCheck] = useState("");
  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    //
  }, []);

      const signUp = async (e) => {
        try {
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
          Swal.fire({
            title: "회원가입 성공",
            text: "로그인 화면으로 이동합니다.",
            confirmButtonColor: '#20b2aa',
            confirmButtonText: '확인',
            imageUrl: heart,
            imageWidth: 130,
            imageHeight: 130,
            imageAlt: "Custom image",
          });
          navigate('/Signin')
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.errorMessage;
          console.log("error with signUp", errorCode, errorMessage);
          Swal.fire({
            title: "회원가입 실패",
            text: "중복이거나 사용할 수 없는 이메일 입니다.",
            confirmButtonColor: '#ef4040',
            confirmButtonText: '확인',
            imageUrl: erroricon,
            imageWidth: 130,
            imageHeight: 130,
            imageAlt: "Custom image"
          });
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
    if (name === "nickname") {
      setNickName(value);
    }
  };

  return (
    <Container>
      <Form onSubmit={signUp}>
        <>
          <Title>회원가입</Title>
          <InputContainer>
            <Input
              type="email"
              value={email}
              name="email"
              placeholder="이메일 (6~30글자)"
              minLength={6}
              maxLength={30}
              onChange={onChange}
              required
            />
            <Input
              type="password"
              value={password}
              name="password"
              placeholder="비밀번호 (6~10글자)"
              minLength={6}
              maxLength={10}
              onChange={onChange}
              required
            />
            <Input
              type="password"
              value={passwdCheck}
              name="passwdCheck"
              placeholder="비밀번호 확인(6~10글자)"
              minLength={6}
              maxLength={10}
              onChange={(e) => setPasswdCheck(e.target.value)}
              required
            />
            {passwdCheck !== "" && password !== passwdCheck && (
              <P> 비밀번호가 일치하지 않습니다.</P>
            )}
            <Input
              type="text"
              value={nickName}
              name="nickname"
              placeholder="닉네임 (2~10글자)"
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
          </ButtonContainer>
        </>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 130px;
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

const P = styled.p`
  font-size: 14px;
  color: #ffc436;
`;
