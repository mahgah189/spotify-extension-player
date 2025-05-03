import "./ButtonLogin.css";
import React from "react";
import { login, getToken } from "../../../auth/authGetTokens.js";

import { ClientIdContext } from "../../context/ContextProvider.jsx";

function ButtonLogin(props) {
  const clientId = React.useContext(ClientIdContext);

  return (
    <>
      <button
        onClick={() => {login(clientId)}}
      >
        {props.children}
      </button>
    </>
  )
};

export default ButtonLogin;