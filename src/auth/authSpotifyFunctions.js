// Redirect to Spotify authorization screen.

export const redirectToAuthCodeFlow = async (clientId, challenge) => {

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "https://127.0.0.1:5173/callback");
  params.append("scope", "streaming user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

// Get access & refresh tokens once authorization comes through.

export const getSpotifyAccessToken = async (clientId, code) => {
  const verifier = localStorage.getItem("verifier");
  const endpoint = "https://accounts.spotify.com/api/token";

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
    const response = await fetch(endpoint, {
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

// Get authenticated user's profile information.

export const getUserProfile = async (token) => {
  const endpoint = "https://api.spotify.com/v1/me";
  const headers = {
    "Authorization": `Bearer ${token}`
  };

  try {
    const response = await fetch(endpoint, {
      headers: headers
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Initiate Spotify Web Player SDK.

export const initWebPlayerSDK = (playerRef) => {
  const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
  
  window.onSpotifyWebPlaybackSDKReady = () => {
    const token = accessToken.token;
    const player = new Spotify.Player({
      name: "Spotify Web Player",
      getOAuthToken: cb => { cb(token); },
      volume: 0.5
    });

    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });

    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    player.addListener("initialization_error", ({ message }) => {
        console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
        console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
        console.error(message);
    });

    player.connect();

    playerRef.current = player;

    console.log(playerRef.current)
  };

  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;
  document.body.appendChild(script);

  return () => {
    delete window.onSpotifyWebPlaybackSDKReady;
  };
};

// Generate a code challenge for Spotify's authentication process.

export const generateCodeChallenge = async (codeVerifier) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Generate a code verifier for Spotify's authentication process.

export const generateCodeVerifier = length => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  };

  return text;
};