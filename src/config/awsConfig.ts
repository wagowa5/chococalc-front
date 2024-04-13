// cognito-config.js

const cognitoConfig = {
  userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
  clientId: import.meta.env.VITE_APP_CLIENT_ID,
  region: import.meta.env.VITE_APP_REGION,
  identityPoolId: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
};

export default cognitoConfig;
