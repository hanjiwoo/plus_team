import React from "react";
import styled from "styled-components";
import HeartEmpty from "../../assets/images/HeartEmpty.png";
import HeartFull from "../../assets/images/HeartFull.png";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addHeart, deleteHeart, getHeart } from "./queryFns";
import { useSelector } from "react-redux";
export default function LikeBtn({ name, id }) {
  const { isLogin, uid /* email, displayName,  photoURL */ } = useSelector(
    (state) => state.authSlice
  );

  // useEffect(() => {
  //   console.log(user, "이거 유저다");
  // }, []);

  // const [like, setLIke] = useState(false);
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

  const filterdHeart1 = hearts?.find((heart) => {
    return heart.gameId === id && heart.uid === uid;
  });
  // console.log(filterdHeart1, "이거 하트들");
  const selectedId = filterdHeart1?.id;
  const likeBTN = () => {
    if (!isLogin) return alert("로그인부터하세요");
    // setLIke(!like);

    if (filterdHeart1) {
      mutateToDelete(selectedId);
    } else {
      mutateToAdd({ uid, id });
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
      <ImageCount>
        <ImageWrapper name={name} onClick={likeBTN}>
          {filterdHeart1 ? (
            <img name={name} src={HeartFull} alt="꽉찬하트"></img>
          ) : (
            <img name={name} src={HeartEmpty} alt="빈하트"></img>
          )}
        </ImageWrapper>
        <p>좋아요개수 :{filteredHearts?.length}</p>{" "}
      </ImageCount>
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
const ImageCount = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ImageWrapper = styled.div`
  width: 50px;
  height: 50px;
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
