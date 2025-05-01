import { redirectToAuthCodeFlow, getSpotifyAccessToken, generateCodeVerifier, generateCodeChallenge } from "./authSpotifyFunctions";

let token;
const spotClientId = "a4757a09b3d24e9ba60446ad4f6bb988";
const proxyWithCorsAnywhereServerURL = "https://corsproxy-z2tzeokdqq-uc.a.run.app/";
const canvasEndpoint = "https://open.spotify.com/get_access_token?reason=transport";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (!code) {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  redirectToAuthCodeFlow(spotClientId, challenge);
} else {
  const accessToken = await getSpotifyAccessToken(spotClientId, code);
  console.log(accessToken);
  token = accessToken;
};

export default token;