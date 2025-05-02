import React from "react";

function ButtonLogout(props) {
  return (
    <>
      <button
        onClick={() => {sessionStorage.clear()}}
      >
        {props.children}
      </button>
    </>
  )
}

export default ButtonLogout;