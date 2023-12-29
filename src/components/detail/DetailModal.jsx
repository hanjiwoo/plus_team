import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "./queryFn";

export default function DetailModal({ setIsEditing, selectedId }) {
  const [post, setPost] = useState({ star: "", text: "" });
  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    // console.log(e.target.name);
    // console.log(post);
  };
  // console.log(selectedId, "셀렉티드 아이디");
  // const { id } = useParams();
  // if (!modaltoggle) return null;
  const queryClient = useQueryClient();
  const { mutate: mutateToEdit } = useMutation({
    mutationFn: editPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const editDone = async () => {
    mutateToEdit({ post, selectedId });

    // await setDoc(doc(db, "posts", `${selectedId}`), {
    //   star: post.star,
    //   content: post.text,
    // });
    setIsEditing(false);
    // navigate(`/detail/${id}`);
    // dispatch(toggle());
    // console.log(id, "일단아이디");
  };

  return (
    <ContentWrapper>
      <Content>
        <select name="star" onChange={onChangeHandler}>
          <option>별점고르세요</option>
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
        <BtnWrapper>
          <CloseBtn
            onClick={() => {
              setIsEditing(false);
              // navigate(`/detail/${id}`);
            }}
          >
            수정취소
          </CloseBtn>
          <button onClick={editDone}>수정완료</button>
        </BtnWrapper>
      </Content>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: lightcoral;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  height: 500px;
  overflow: auto;
  position: relative;
`;

const CloseBtn = styled.button`
  cursor: pointer;
`;

const BtnWrapper = styled.div`
  display: flex;
`;
const TextArea = styled.textarea`
  width: 400px;
  height: 50px;

  resize: none;
`;
