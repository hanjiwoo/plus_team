import React from "react";

export default function CustomHook() {
  const [post, setPost] = useState({ star: "", text: "" });
  const onChangeHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    // console.log(e.target.name);
    // console.log(post);
  };

  return <></>;
}
