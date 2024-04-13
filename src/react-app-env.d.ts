/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_USER_POOL_ID: string;
    REACT_APP_CLIENT_ID: string;
    REACT_APP_REGION: string;
    REACT_APP_IDENTITY_POOL_ID: string;
    REACT_APP_CHOCOCALC_API_ENDPOINT: string;
    REACT_APP_COGNITO_PASS: string;
  }
}
