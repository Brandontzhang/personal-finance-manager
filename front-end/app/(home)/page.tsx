'use client';

import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {

  const { isAuthenticated } = useAuth0();

  return (
    <div>
      Home Page
      {isAuthenticated ? <span>Logged In</span> : <span>Nope</span>}
    </div>
  );
}
