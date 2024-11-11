import authConfigJson from "./auth_config.json";

export const getAuthConfig = () => {
  const audience =
    authConfigJson.audience && authConfigJson.audience !== "YOUR_API_IDENTIFIER"
      ? authConfigJson.audience
      : null;

  return {
    domain: authConfigJson.domain,
    clientId: authConfigJson.clientId,
    redirecUri: authConfigJson.redirectUri,
    ...(audience ? { audience } : null),
  };

};

