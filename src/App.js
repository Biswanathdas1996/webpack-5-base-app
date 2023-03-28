import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Redux from "./pages/Redux";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/redux" element={<Redux />} />
    </Routes>
  );
}

export default App;
