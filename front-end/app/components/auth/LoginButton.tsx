'use client';

import { useAuth0 } from "@auth0/auth0-react"
import { redirect } from "next/navigation";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect({
      appState: { url: window.location.pathname },
    })}>
      Log In
    </button>
  )
}

export default LoginButton;
