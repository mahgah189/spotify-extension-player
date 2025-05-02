import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import WebPlayerLayout from "./components/layouts/WebPlayerLayout/WebPlayerLayout.jsx";
import Callback from "./components/pages/Callback/Callback.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/callback" element={<Callback />} />
        <Route path="/" element={<WebPlayerLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;