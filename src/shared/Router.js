import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/Common/Layout";
import Home from "../pages/Home";
import DetailPage from "../pages/DetailPage";
import MemoryCardPage from "../pages/MemoryCardPage";
import GlobalFonts from "../assets/fonts/GlobalFonts";
import SpeedGamePage from "../pages/SpeedGamePage";
import Signin from "../pages/Signin";
import Register from "../pages/Register";

export default function Router() {
  return (
    <>
      <GlobalFonts />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/memorycard" element={<MemoryCardPage />} />
            <Route path="/speedgame" element={<SpeedGamePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
