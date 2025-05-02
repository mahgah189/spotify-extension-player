import React from "react";
import login from "../../../auth/authGetTokens.js";
import { getSpotifyAccessToken } from "../../../auth/authSpotifyFunctions.js";

function ButtonLogin(props) {
  let token;
  const spotClientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  React.useEffect(() => {
    const getToken = async (id, code) => {
      const accessToken = await getSpotifyAccessToken(id, code);
      console.log(accessToken);
      token = accessToken;
    };

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