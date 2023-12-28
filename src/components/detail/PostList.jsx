import React, { useState } from "react";
import styled from "styled-components";

import DetailModal from "./DetailModal";
import SelectStar from "./SelectStar";
import { useSelector } from "react-redux";
import { addPost, deletePost, getPosts } from "./queryFn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function PostList({ id }) {
  const [post, setPost] = useState({ star: "", text: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const zzz = useSelector((state) => state.post);
  // console.log(zzz);
  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    // console.log(e.target.name);
    // console.log(post);
  };
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  // console.log(posts, " 데이터야2");
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  // const getData = async () => {
  //   let dataArr = [];
  //   const response = await getDocs(collection(db, "posts"));
  //   response.forEach((doc) => {
  //     const data = doc.data();
  //     dataArr.push({ ...data, id: doc.id });
  //     setList(dataArr);
  //   });
  // };
  const postHandler = async () => {
    if (!post.star || !post.text) return alert("별점과 내용을 선택해주세요");

    mutateToAdd({ post, id });
    // await addDoc(collection(db, "posts"), {
    //   star: post.star,
    //   uid: "",
    //   content: post.text,
    //   id: "",
    // });

    // await getData();
    setPost({ star: "", text: "" });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const deleteHandler = async (id) => {
    // await deleteDoc(doc(db, "posts", `${id}`));
    mutateToDelete(id);
    // await getData();
  };

  const editHandler = async (id) => {
    setIsEditing(!isEditing);
    // await setDoc(doc(db, "posts", `${id}`), {
    //   star: "사라졌디용",
    //   content: "뭘로바꾸게?",
    // });
    // setList([]);
    // console.log(id, "일단아이디");
    setSelectedId(id);
  };

  const filteredposts = posts?.filter((post) => {
    return post.gameId === id;
  });
  if (isLoading) {
    return <>로딩중....</>;
  }
  return (
    <>
      {isEditing && (
        <DetailModal setIsEditing={setIsEditing} selectedId={selectedId} />
      )}

      <PostWrapper>
        {filteredposts.map((post) => {
          return (
            <List key={post.id}>
              <p>{post.star}</p>
              <p> {post.content}</p>
              <div>
                <button onClick={() => editHandler(post.id)}>수정하기</button>
                <button onClick={() => deleteHandler(post.id)}>삭제하기</button>
              </div>
            </List>
          );
        })}
      </PostWrapper>
      <SelectStar onChangeHandler={onChangeHandler} />
      <TextArea
        name="text"
        value={post.text}
        onChange={onChangeHandler}
        placeholder="게임을 평가해주세요 최대 30자"
        maxLength={30}
      ></TextArea>
      <button onClick={postHandler}>제출하기</button>
    </>
  );
}

const PostWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 300px;
  background-color: lightseagreen;
`;

const TextArea = styled.textarea`
  width: 400px;
  height: 50px;

  resize: none;
`;

const List = styled.div`
  width: 90%;
  height: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  & input {
    width: 400px;
  }
`;
