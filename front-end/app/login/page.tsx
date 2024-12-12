"use client";

import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/auth/LoginButton";
import LogoutButton from "../components/auth/LogoutButton";

export default function Login() {

  const { isAuthenticated } = useAuth0();

  return (
    <div>
      {!isAuthenticated ?
        <LoginButton /> :
        <LogoutButton />
      }
    </div>
  );
}
