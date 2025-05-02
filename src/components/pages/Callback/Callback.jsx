import React from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../../../auth/authGetTokens.js";

function Callback() {
  const navigate = useNavigate();
  const spotClientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  React.useEffect(() => {

    console.log(localStorage.getItem("verifier"));

    if (localStorage.getItem("verifier")) {
      getToken(spotClientId, code);
      navigate("/");
    }
  }, []);

  return (
    <>
    </>
  )
};

export default Callback;