/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_USER_POOL_ID: string;
  readonly VITE_APP_CLIENT_ID: string;
  readonly VITE_APP_REGION: string;
  readonly VITE_APP_IDENTITY_POOL_ID: string;
  readonly VITE_APP_CHOCOCALC_API_ENDPOINT: string;
  readonly VITE_APP_COGNITO_PASS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
