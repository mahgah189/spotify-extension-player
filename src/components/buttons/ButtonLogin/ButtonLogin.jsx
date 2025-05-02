import React from "react";
import login from "../../../auth/authGetTokens.js";
import { getSpotifyAccessToken } from "../../../auth/authSpotifyFunctions.js";
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

const app = initializeApp({
  projectId: "statify-3b944",
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "statify-3b944.firebaseapp.com"
});
const functions = getFunctions(app);
const storeToken = httpsCallable(functions, "storeToken");

function ButtonLogin(props) {
  let token;
  const spotClientId = import.meta.env.VITE_CLIENT_ID;
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  React.useEffect(() => {
    const getToken = async (id, code) => {
      const accessToken = await getSpotifyAccessToken(id, code);
      const result = await storeToken(accessToken);
      console.log(result);
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