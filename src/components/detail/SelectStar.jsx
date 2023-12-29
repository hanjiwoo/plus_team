import React from "react";

export default function SelectStar({ onChangeHandler, disabled }) {
  return (
    <>
      <select disabled={disabled} name="star" onChange={onChangeHandler}>
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
