import React from "react";
import { useNavigate } from "react-router-dom";

import { getToken } from "../../../auth/authGetTokens.js";
import { ClientIdContext } from "../../../App.jsx";

function Callback() {
  const navigate = useNavigate();
  const clientId = React.useContext(ClientIdContext);
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  React.useEffect(() => {
    if (localStorage.getItem("verifier")) {
      getToken(clientId, code);
      navigate("/");
    }
  }, []);

  return (
    <>
    </>
  )
};

export default Callback;