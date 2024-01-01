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
  const { uid, isLogin /* email,  displayName,  photoURL */ } = useSelector(
    (state) => state.authSlice
  );
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
    if (!post.text) return alert("내용을 입력해주세요");
    if (!post.star || post.star === "별점을 선택해주세요")
      return alert("별점을 입력해주세요");

    mutateToAdd({ post, id, uid });
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
  // const sortedposts = filteredposts.sort((a, b) => b.createdAt - a.createdAt);

  if (isLoading) {
    return <>로딩중....</>;
  }
  return (
    <>
      {isEditing && (
        <DetailModal
          setIsEditing={setIsEditing}
          value={post.star}
          selectedId={selectedId}
        />
      )}
      <StP>- 게임 후기 -</StP>
      <PostWrapper>
        {filteredposts.map((post) => {
          return (
            <List key={post.id}>
              <StP3>{post.star}</StP3>
              <StP2> {post.content}</StP2>
              <div>
                {uid === post.uid && (
                  <>
                    <StBtn2 onClick={() => editHandler(post.id)}>수정</StBtn2>
                    <StBtn2 onClick={() => deleteHandler(post.id)}>삭제</StBtn2>
                  </>
                )}
              </div>
            </List>
          );
        })}
      </PostWrapper>
      <SelectStar
        disabled={!isLogin}
        value={post.star}
        onChangeHandler={onChangeHandler}
      />
      <StContent>
        <TextArea
          name="text"
          value={post.text}
          onChange={onChangeHandler}
          placeholder={
            isLogin
              ? "게임을 평가해주세요. (30 글자 이내)"
              : "로그인이 필요합니다."
          }
          maxLength={30}
        ></TextArea>
        <StBtn disabled={!isLogin} onClick={postHandler}>
          등록하기
        </StBtn>
      </StContent>
    </>
  );
}

const PostWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 800px;
  height: 250px;
`;

const TextArea = styled.textarea`
  width: 700px;
  height: 70px;
  padding: 10px;
  font-size: 15px;
  resize: none;
  border-radius: 10px;
`;

const List = styled.div`
  width: 90%;
  height: 15px;
  display: flex;
  padding-top: 20px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  & input {
    width: 400px;
  }
`;

const StContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const StBtn = styled.button`
  width: 100px;
  border-radius: 5px;
  font-size: 15px;
  color: white;
  background-color: #20b2aa;
  border: 1px solid;
`;

const StP = styled.p`
  margin: 50px 0px 0px 0px;
  font-size: 25px;
  text-align: left;
  color: black;
`;

const StP2 = styled.p`
  width: 200px;
`;

const StP3 = styled.p`
  width: 0px;
`;

const StBtn2 = styled.button`
  border: none;
  border-radius: 5px;
  font-size: 12px;
  padding: 5px;
  margin-right: 5px;
  width: 50px;
  background-color: #ffa732;
`;
