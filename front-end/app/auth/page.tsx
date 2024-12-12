'use client';

import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const AuthPage = () => {

  const { user, isLoading, isAuthenticated, handleRedirectCallback } = useAuth0();

  // TODO: Whenever a user attempts to go to a page and they're not authorized, they should be redirected here, have their access checked, and then
  // redirected to back or to login

  useEffect(() => {
    const fetchAuthData = async () => {
      // await handleRedirectCallback();
    };

    fetchAuthData();
    redirect('/');
  }, []);

  return (
    <div>
      Logging you in...
    </div>
  )
};

export default AuthPage
