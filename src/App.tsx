import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Redux from "./pages/Redux";
import ApiCall from "./pages/ApiCall";
import { site_text } from "./utils/languageMapper";

window.site_text = (key: string) => site_text(key) || "";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home name={""} age={0} />} />
      <Route path="/redux" element={<Redux />} />
      <Route path="/api" element={<ApiCall />} />
    </Routes>
  );
}

export default App;
