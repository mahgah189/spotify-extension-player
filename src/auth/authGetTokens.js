import { redirectToAuthCodeFlow, getSpotifyAccessToken, generateCodeVerifier, generateCodeChallenge } from "./authSpotifyFunctions";

const proxyWithCorsAnywhereServerURL = "https://corsproxy-z2tzeokdqq-uc.a.run.app/";
const canvasEndpoint = "https://open.spotify.com/get_access_token?reason=transport";

const login = async (id) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  redirectToAuthCodeFlow(id, challenge);
};

export default login;