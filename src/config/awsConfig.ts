// cognito-config.js

const cognitoConfig = {
    userPoolId: process.env.REACT_APP_USER_POOL_ID,
    clientId: process.env.REACT_APP_CLIENT_ID,
    region: process.env.REACT_APP_REGION,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
};

export default cognitoConfig;
