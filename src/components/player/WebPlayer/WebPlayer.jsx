import "./WebPlayer.css";
import React from "react";

import { LoggedInContext } from "../../context/ContextProvider.jsx";
import { initWebPlayerSDK } from "../../../auth/authSpotifyFunctions.js";

function WebPlayer() {
  const playerRef = React.useRef();

  const { isLoggedIn } = React.useContext(LoggedInContext);

  React.useEffect(() => {
    if (isLoggedIn) {
      initWebPlayerSDK(playerRef);
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