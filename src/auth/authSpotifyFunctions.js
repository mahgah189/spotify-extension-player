export const redirectToAuthCodeFlow = async (clientId, challenge) => {

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://127.0.0.1:5173/callback");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getSpotifyAccessToken = async (clientId, code) => {
  const verifier = localStorage.getItem("verifier");
  const tokenEndpoint = "https://accounts.spotify.com/api/token";

  const body = new URLSearchParams();
  body.append("client_id", clientId);
  body.append("grant_type", "authorization_code");
  body.append("code", code);
  body.append("redirect_uri", "https://127.0.0.1:5173/callback");
  body.append("code_verifier", verifier);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await fetch(tokenEndpoint, {
      method: "POST",
      headers: headers,
      body: body
    });
    localStorage.removeItem("verifier");
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const generateCodeChallenge = async (codeVerifier) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const generateCodeVerifier = length => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  };

  return text;
};