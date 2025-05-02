import { redirectToAuthCodeFlow, getSpotifyAccessToken, getUserProfile, generateCodeVerifier, generateCodeChallenge } from "./authSpotifyFunctions";
import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';

// const proxyWithCorsAnywhereServerURL = "https://corsproxy-z2tzeokdqq-uc.a.run.app/";
// const canvasEndpoint = "https://open.spotify.com/get_access_token?reason=transport";

const app = initializeApp({
  projectId: "statify-3b944",
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "statify-3b944.firebaseapp.com"
});
const functions = getFunctions(app);
const storeToken = httpsCallable(functions, "storeToken");

export const login = async (id) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  redirectToAuthCodeFlow(id, challenge);
};

export const checkLogin = () => {
  return sessionStorage.getItem("accessToken") 
    ? true 
    : false
}

export const getToken = async (id, code) => {
  const accessToken = await getSpotifyAccessToken(id, code);

  const sessionAccessToken = {
    token: accessToken.access_token,
    expires_in: Date.now() + 3600000
  };
  sessionStorage.setItem("accessToken", JSON.stringify(sessionAccessToken));

  const profile = await getUserProfile(accessToken.access_token);
  const userData = [profile.id, {
    email: profile.email,
    refresh_token: accessToken.refresh_token
  }]
  console.log(userData);
  
  const result = await storeToken(userData);
  console.log(result);
};