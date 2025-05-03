import React from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;

export const ClientIdContext = React.createContext({
  clientId: "string"
});

export const LoggedInContext = React.createContext({
  isLoggedIn: false,
  checkLogin: () => {}
});

export function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const checkLogin = () => {
    if (sessionStorage.getItem("accessToken")) {
      setIsLoggedIn(prev => {
        return true;
      });
    } else {
      setIsLoggedIn(prev => {
        return false;
      });
    }
  };

  return (
    <ClientIdContext.Provider value={ clientId }>
      <LoggedInContext.Provider value={{ isLoggedIn, checkLogin }}>
        { props.children }
      </LoggedInContext.Provider>
    </ClientIdContext.Provider>
  )
};