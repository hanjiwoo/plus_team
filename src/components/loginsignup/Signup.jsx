import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { auth } from '../../shared/firebase';
import { createUserWithEmailAndPassword,  updateProfile} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';

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
          navigate('/Signin')
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.errorMessage;
          console.log("error with signUp", errorCode, errorMessage);
          alert("중복이거나 사용할 수 없는 이메일 입니다.");
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
            <Title>Signup</Title>
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
            </ButtonContainer>
          </>
        </Form>
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

const P = styled.p`
  font-size: 15px;
  color: #ffa559;
`;
