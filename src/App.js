import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Redux from "./pages/Redux";
import ApiCall from "./pages/ApiCall";
import { site_text } from "./utils/languageMapper";

window.site_text = site_text;

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/redux" element={<Redux />} />
      <Route exact path="/api" element={<ApiCall />} />
    </Routes>
  );
}

export default App;
