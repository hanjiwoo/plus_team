import React from "react";
import { Outlet } from "react-router-dom";
import { StMain } from "./styles";

export default function Main() {
  return (
    <StMain>
      <Outlet />
    </StMain>
  );
}
