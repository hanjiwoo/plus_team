import React, { useState } from "react";
import styled from "styled-components";

export default function PostList() {
  const [post, setPost] = useState({ star: "", text: "" });

  const onChangeHandler = (e) => {
    setPost({ [e.target.name]: e.target.value, ...post });
    console.log(e.target.name);
    console.log(post);
  };

  return (
    <>
      <PostWrapper></PostWrapper>
      <select name="star" onChange={onChangeHandler}>
        <option>별점선택</option>
        <option>⭐</option>
        <option>⭐⭐</option>
        <option>⭐⭐⭐</option>
        <option>⭐⭐⭐⭐</option>
        <option>⭐⭐⭐⭐⭐</option>
      </select>
      <TextArea
        name="text"
        value={post.text}
        onChange={onChangeHandler}
        placeholder="게임을 평가해주세요 최대 30자"
        maxLength={30}
      ></TextArea>
    </>
  );
}

const PostWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 300px;
  background-color: lightseagreen;
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 50px;

  resize: none;
`;
