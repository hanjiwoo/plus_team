import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPost } from "./queryFn";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export default function DetailModal({ setIsEditing, selectedId }) {
  // const [post, setPost] = useState({ star: "", text: "" });
  // const onChangeHandler = (e) => {
  //   setPost({ ...post, [e.target.name]: e.target.value });
  //   // console.log(e.target.name);
  //   // console.log(post);
  // };
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitted },
  } = useForm();
  const onSubmit = (post) => {
    // console.log("제출된거", post);
    if (!post.text)
      return Swal.fire({
        title: "텍스트 없어요",
        text: "텍스트 쓰세요",
        icon: "warning", // success, error, warning, info 등의 아이콘 지정 가능
        confirmButtonText: "확인",
      });
    if (!post.star || post.star === "별점을 선택해주세요.")
      return Swal.fire({
        title: "별점이 없어요",
        text: "별점을 고르세요",
        icon: "warning", // success, error, warning, info 등의 아이콘 지정 가능
        confirmButtonText: "확인",
      });
    mutateToEdit({ post, selectedId });
    setIsEditing(false);
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
  // const editDone = async () => {

  // mutateToEdit({ post, selectedId });

  // await setDoc(doc(db, "posts", `${selectedId}`), {
  //   star: post.star,
  //   content: post.text,
  // });

  // navigate(`/detail/${id}`);
  // dispatch(toggle());
  // console.log(id, "일단아이디");
  // };

  return (
    <ContentWrapper onSubmit={handleSubmit(onSubmit)}>
      <Content>
        {errors.star && <small role="alert">{errors.star.message}</small>}
        <select /*name="star" value={post.star} onChange={onChangeHandler} */
          {...register("star", { required: "별점선택필수." })}
          aria-invalid={isSubmitted ? (errors.star ? "true" : "false") : null}
        >
          <option>별점을 선택해주세요.</option>
          <option>⭐</option>
          <option>⭐⭐</option>
          <option>⭐⭐⭐</option>
          <option>⭐⭐⭐⭐</option>
          <option>⭐⭐⭐⭐⭐</option>
        </select>
        {errors.text && <small role="alert">{errors.text.message}</small>}
        <TextArea
          /*  name="text"
          value={post.text}
          onChange={onChangeHandler} */
          placeholder="게임을 평가해주세요. (30 글자 이내)"
          maxLength={30}
          {...register("text", {
            maxLength: {
              value: 30,
              message: "30자 이내로 적어주세요",
            },
          })}
          aria-invalid={isSubmitted ? (errors.text ? "true" : "false") : null}
        ></TextArea>
        <BtnWrapper>
          <StBtn
            type="text"
            onClick={() => {
              setIsEditing(false);
              // navigate(`/detail/${id}`);
            }}
          >
            취소
          </StBtn>
          <StBtn type="submit" /* onClick={editDone} */ disabled={isSubmitting}>
            수정
          </StBtn>
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
const Content = styled.form`
  display: flex;
  align-items: end;
  justify-content: center;
  flex-direction: column;
  background: white;
  padding-right: 50px;
  border-radius: 20px;
  width: 800px;
  height: 200px;
  overflow: auto;
  position: relative;
`;

const StBtn = styled.button`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px;
  margin-top: 10px;
  margin-right: 5px;
  width: 50px;
  background-color: #ffa732;
`;

const BtnWrapper = styled.div`
  display: flex;
`;
const TextArea = styled.textarea`
  width: 700px;
  height: 70px;
  resize: none;
`;
