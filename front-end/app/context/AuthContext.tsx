'use client';

import { Auth0Provider } from "@auth0/auth0-react";
import { getAuthConfig } from "../config/config";

const config = getAuthConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  //onRedirectCallback,
  authorizationParams: {
    redirect_uri: config.redirecUri,
    ...(config.audience ? { audience: config.audience } : null),
  },
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Auth0Provider
      {...providerConfig}
    >
      {children}
    </Auth0Provider>
  )
};

export default AuthProvider;
