import React from "react";
import { Link } from "react-router-dom";
import { StHeader } from "./styles";

export default function Card() {
  return (
    <div>
      <StHeader>
        <h1>원하는 게임을 골라봐라</h1>
      </StHeader>
      <main>
        <section>
          <h2>게임 카드 보여주기</h2>
        </section>
      </main>
      <footer>
        <p>여기는 푸터임</p>
      </footer>
    </div>
  );
}
