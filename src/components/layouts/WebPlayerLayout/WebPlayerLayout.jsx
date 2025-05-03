import "./WebPlayerLayout.jsx";
import React from "react";
import { Outlet } from "react-router-dom";

import ButtonLogin from "../../buttons/ButtonLogin/ButtonLogin.jsx";
import WebPlayer from "../../player/WebPlayer/WebPlayer.jsx";

import { LoggedInContext } from "../../context/ContextProvider.jsx";

function WebPlayerLayout() {
  const { isLoggedIn, checkLogin } = React.useContext(LoggedInContext);

  React.useEffect(() => {
    checkLogin();
  }, [])

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