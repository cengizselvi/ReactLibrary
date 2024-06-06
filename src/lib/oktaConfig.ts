export const oktaConfig = {
  clientId: "0oabgq01xodnxRbBZ5d7",
  issuer: "https://dev-14116122.okta.com/oauth2/default",
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
