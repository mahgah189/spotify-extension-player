import "./WebPlayerLayout.jsx";
import React from "react";
import { Outlet } from "react-router-dom";

import ButtonLogin from "../../buttons/ButtonLogin/ButtonLogin.jsx";
import WebPlayer from "../../player/WebPlayer/WebPlayer.jsx";

function WebPlayerLayout() {
  const [isLoggedIn, updateIsLoggedin] = React.useState(false);

  React.useEffect(() => {

  }, [isLoggedIn]);

  return (
    <div className="webplayer-wrapper">
      <div className="webplayer-component-wrapper">
        {isLoggedIn 
          ? <WebPlayer />
          : <ButtonLogin>Login</ButtonLogin>}
      </div>
    </div>
  )
};

export default WebPlayerLayout;