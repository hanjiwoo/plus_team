import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "components/Common/Layout";
import Home from "pages/Home";
import DetailPage from "../pages/DetailPage";
import MemoryCardPage from "pages/MemoryCardPage";

export default function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/memorycard" element={<MemoryCardPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
