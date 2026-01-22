// cognito-config.js

const isTestEnv = process.env.NODE_ENV === 'test';

const cognitoConfig = {
    userPoolId: process.env.REACT_APP_USER_POOL_ID ?? (isTestEnv ? 'test-user-pool-id' : undefined),
    clientId: process.env.REACT_APP_CLIENT_ID ?? (isTestEnv ? 'test-client-id' : undefined),
    region: process.env.REACT_APP_REGION ?? (isTestEnv ? 'test-region' : undefined),
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID ?? (isTestEnv ? 'test-identity-pool-id' : undefined),
};

export default cognitoConfig;
