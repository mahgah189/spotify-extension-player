import React from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../../../auth/authGetTokens.js";
import { ClientIdContext } from "../../context/ContextProvider.jsx";
import { LoggedInContext } from "../../context/ContextProvider.jsx";

function Callback() {
  const clientId = React.useContext(ClientIdContext);
  const { checkLogin } = React.useContext(LoggedInContext);
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  React.useEffect(() => {
    const fetchToken = async () => {
      if (localStorage.getItem("verifier")) {
        await getToken(clientId, code);
        checkLogin();
        navigate("/");
      }
    }

    fetchToken();
  }, []);

  return (
    <>
    </>
  )
};

export default Callback;