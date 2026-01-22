// cognito-config.js

const isTestEnv = process.env.NODE_ENV === 'test';

const cognitoConfig = {
    userPoolId: process.env.REACT_APP_USER_POOL_ID ?? (isTestEnv ? 'us-east-1_TestPoolId' : undefined),
    clientId: process.env.REACT_APP_CLIENT_ID ?? (isTestEnv ? '1234567890abcdef1234567890abcdef' : undefined),
    region: process.env.REACT_APP_REGION ?? (isTestEnv ? 'us-east-1' : undefined),
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID ?? (isTestEnv ? 'us-east-1:00000000-0000-0000-0000-000000000000' : undefined),
};

export default cognitoConfig;
