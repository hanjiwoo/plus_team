import React, { useState, useRef, useCallback } from "react";
import {
  StContainer,
  Stscreen,
  StText,
  StTime,
  StContent,
  StBtn,
} from "./style";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요 !");
  const [result, setResult] = useState([]);
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭 !!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
      setState("ready");
      setMessage("초록색이 되면 화면을 클릭하세요 !");
    } else if (state === "ready") {
      // 성급하게 클릭
      clearTimeout(timeout.current);
      setState("waiting");
      setMessage(
        <>
          너무 성급해요 ! <br />
          초록색이 되면 클릭하세요 !
        </>
      );
    } else if (state === "now") {
      // 반응속도 체크
      endTime.current = new Date();
      setState("waiting");
      setMessage("화면을 클릭하면 시작합니다.");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      });
    }
  }, [state]);

  // 평균 반응 속도 --> 초기화 버튼
  const onReset = useCallback(() => {
    setResult([]);
  }, []);

  // 평균 반응 속도
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <StContent>
        <StTime>
          {`평균 반응 속도 :  ${
            result.reduce((a, c) => a + c) / result.length
          } ms`}
        </StTime>
        <StBtn onClick={onReset}>Reset</StBtn>
      </StContent>
    );
  };

  return (
    <>
      <StContainer>
        {renderAverage()}
        <Stscreen className={state} onClick={onClickScreen}>
          <StText>{message}</StText>
        </Stscreen>
      </StContainer>
    </>
  );
};

export default ResponseCheck;
