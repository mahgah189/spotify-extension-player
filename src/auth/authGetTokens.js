import { redirectToAuthCodeFlow, getSpotifyAccessToken, generateCodeVerifier, generateCodeChallenge } from "./authSpotifyFunctions";

const login = async (id) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  redirectToAuthCodeFlow(id, challenge);
};

export default login;