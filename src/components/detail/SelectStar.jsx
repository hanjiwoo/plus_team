import React from "react";

export default function SelectStar({ onChangeHandler }) {
  return (
    <>
      <select name="star" onChange={onChangeHandler}>
        <option>별점고르세요</option>
        <option>⭐</option>
        <option>⭐⭐</option>
        <option>⭐⭐⭐</option>
        <option>⭐⭐⭐⭐</option>
        <option>⭐⭐⭐⭐⭐</option>
      </select>
    </>
  );
}
