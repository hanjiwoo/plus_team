import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  setDoc,
} from "@firebase/firestore";
import { db } from "../../shared/firebase";

export const getPosts = async () => {
  let data = [];
  const response = await getDocs(collection(db, "posts"));
  //   console.log(response.docs, "리스판스야");
  //   data = response.docs;
  response.forEach((doc) => {
    const docData = doc.data();
    // console.log(zzz, "크크크야");
    data.push({ ...docData, id: doc.id });
  });
  //   console.log(data, " 데이터야");
  return data;
};

export const addPost = async ({ post, id }) => {
  await addDoc(collection(db, "posts"), {
    star: post.star,
    uid: "",
    content: post.text,
    id: "",
    gameId: id,
  });
};

export const deletePost = async (id) => {
  await deleteDoc(doc(db, "posts", `${id}`));
};
export const editPost = async ({ post, id }) => {
  await setDoc(doc(db, "posts", `${id}`), {
    star: post.star,
    content: post.text,
  });
};

export const getHeart = async () => {
  let data = [];
  const response = await getDocs(collection(db, "hearts"));
  //   console.log(response.docs, "리스판스야");
  //   data = response.docs;
  response.forEach((doc) => {
    const docData = doc.data();
    // console.log(zzz, "크크크야");
    data.push({ ...docData, id: doc.id });
  });
  //   console.log(data, " 데이터야");
  return data;
};

export const addHeart = async ({ userId_fake, id }) => {
  await addDoc(collection(db, "hearts"), {
    uid: userId_fake,
    gameId: id,
    haha: "haha",
  });
};

export const deleteHeart = async (selectedId) => {
  await deleteDoc(doc(db, "hearts", `${selectedId}`));
};
