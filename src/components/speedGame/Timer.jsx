import React, { useState, useEffect } from "react";
import styled from "styled-components";

function Timer({ record }) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  record.current = timeElapsed;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 30);
    }, 30);
    return () => clearInterval(timer);
  }, []);
  return (
    <Container>
      <Time>
        {Math.floor(timeElapsed / 1000)} : {(timeElapsed % 1000) / 10}
      </Time>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 30px;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const Time = styled.div`
  position: fixed;
  text-align: center;
  top: 250px;
  width: 100%;
  color: darkkhaki;
`;

export default Timer;
