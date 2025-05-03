import "./WebPlayer.css";
import React from "react";

import { LoggedInContext } from "../../context/ContextProvider.jsx";

function WebPlayer() {
  const playerRef = React.useRef();

  const { isLoggedIn } = React.useContext(LoggedInContext);

  React.useEffect(() => {
    if (isLoggedIn) {
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
    }
  }, [isLoggedIn]);

  return (
    <>
      <button 
        id="togglePlay"
        onClick={
          () => { playerRef.current?.togglePlay() }
        }
      >Toggle Play</button>
    </>
  )
};

export default WebPlayer;