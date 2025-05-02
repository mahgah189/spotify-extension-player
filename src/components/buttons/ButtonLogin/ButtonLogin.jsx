import React from "react";
import { login, getToken } from "../../../auth/authGetTokens.js";

function ButtonLogin(props) {
  const spotClientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  React.useEffect(() => {

    console.log(localStorage.getItem("verifier"));

    if (localStorage.getItem("verifier")) {
      getToken(spotClientId, code);
    }
  }, [])

  return (
    <>
      <button
        onClick={() => {login(spotClientId)}}
      >
        {props.children}
      </button>
    </>
  )
};

export default ButtonLogin;