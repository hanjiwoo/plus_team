import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";

function Timer() {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const record = useRef();
  record.current = timeElapsed;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((timeElapsed) => timeElapsed + 30);
    }, 30);
    return () => {
      let timerInterval;
      Swal.fire({
        title: "축하 드립니다 !!!",
        html: `완료 기록 : ${record.current / 1000}초`,
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      //alert("완료 기록 :" + record.current / 1000 + "초");
      clearInterval(timer);
    };
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
