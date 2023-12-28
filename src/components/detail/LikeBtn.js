import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeartEmpty from "../../assets/images/HeartEmpty.png";
import HeartFull from "../../assets/images/HeartFull.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addHeart, deleteHeart, getHeart } from "./queryFn";
import { nanoid } from "nanoid";
export default function LikeBtn({ id }) {
  // console.log(id, "이거아이디다");
  const [like, setLIke] = useState(false);
  const { data: hearts, isLoading } = useQuery({
    queryKey: ["hearts"],
    queryFn: getHeart,
  });
  // console.log(posts, " 데이터야2");
  const queryClient = useQueryClient();
  const { mutate: mutateToAdd } = useMutation({
    mutationFn: addHeart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hearts"] });
    },
  });
  const { mutate: mutateToDelete } = useMutation({
    mutationFn: deleteHeart,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["hearts"] });
    },
  });
  // let userId_fake;
  // useEffect(() => {
  //   userId_fake = nanoid();
  // }, []);

  const filteredHearts = hearts?.filter((heart) => {
    return heart.gameId === id;
  });
  let userId_fake = "1";
  const filterdHeart1 = hearts?.find((heart) => {
    return heart.gameId === id && heart.uid === userId_fake;
  });
  console.log(filterdHeart1, "이거 하트들");
  const selectedId = filterdHeart1?.id;
  const likeBTN = () => {
    // setLIke(!like);

    if (filterdHeart1) {
      mutateToDelete(selectedId);
    } else {
      mutateToAdd({ userId_fake, id });
    }
  };
  if (isLoading) {
    return <>로딩중...</>;
  }
  return (
    <>
      {/* <LikeButton $like={like.toString()} onClick={likeBTN}>
        좋아요 버튼
      </LikeButton> */}
      <Image_count>
        <ImageWrapper onClick={likeBTN}>
          {filterdHeart1 ? (
            <img src={HeartFull}></img>
          ) : (
            <img src={HeartEmpty}></img>
          )}
        </ImageWrapper>
        <p>좋아요개수 :{filteredHearts?.length}</p>{" "}
      </Image_count>
      <div></div>
    </>
  );
}

// const LikeButton = styled.div`
//   cursor: pointer;
//   ${(props) => {
//     switch (props.$like) {
//       case "true":
//         return css`
//           background-color: red;
//         `;
//       default:
//         return css`
//           background-color: white;
//         `;
//     }
//   }}
// `;
const Image_count = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  overflow: hidden;
  & img {
    width: 100%;
    height: 100%;
  }
`;
