'use client';

import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { getAuthConfig } from "../config/config";

const config = getAuthConfig();

const providerConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  cacheLocation: 'localstorage',
  //onRedirectCallback,
  authorizationParams: {
    redirect_uri: config.redirecUri,
    ...(config.audience ? { audience: config.audience } : null),
  },
  onRedirectCallback: (appstate) => {
    console.log(appstate);
  }
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
