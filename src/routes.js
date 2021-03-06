import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Repo from "./pages/Repo";

export default function HandleRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repos/:repo" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}
