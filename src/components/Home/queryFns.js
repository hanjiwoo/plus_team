import {
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
} from "@firebase/firestore";
import { db } from "../../shared/firebase";

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

export const addHeart = async ({ uid, id }) => {
  await addDoc(collection(db, "hearts"), {
    uid,
    gameId: id,
    haha: "haha",
  });
};

export const deleteHeart = async (selectedId) => {
  await deleteDoc(doc(db, "hearts", `${selectedId}`));
};
