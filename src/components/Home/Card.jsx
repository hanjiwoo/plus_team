import React from "react";
import { Link } from "react-router-dom";

export default function Card() {
  return (
    <div>
      <header>
        <h1>게임 소개 사이트</h1>
      </header>
      <main>
        <section>
          <h2>주목할만한 게임</h2>
          {/* 주목할만한 게임 정보 */}
          <Link to="/game/featured">자세히 보기</Link>
        </section>
      </main>
      <footer>
        <p>2023 게임 소개 사이트</p>
      </footer>
    </div>
  );
}
