import './App.css'
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import WebPlayerLayout from "./components/layouts/WebPlayerLayout/WebPlayerLayout.jsx";
import Callback from "./components/pages/Callback/Callback.jsx";

const ClientIdContext = React.createContext();

export default function App() {
  const clientId = import.meta.env.VITE_CLIENT_ID;

  return (
    <ClientIdContext.Provider value={ clientId }>
      <BrowserRouter>
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<WebPlayerLayout />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </ClientIdContext.Provider>
  )
}

export { ClientIdContext };