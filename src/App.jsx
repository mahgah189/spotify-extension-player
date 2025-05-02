import './App.css'
import token from "./auth/authGetTokens.js";
import ButtonLogin from "./components/buttons/ButtonLogin/ButtonLogin.jsx";
import login from "./auth/authGetTokens.js";

function App() {

  return (
    <>
      <ButtonLogin>
        Login
      </ButtonLogin>
    </>
  )
}

export default App;