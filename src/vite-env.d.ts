/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STAGE: string
  readonly VITE_MSS_API_URL: string
  readonly VITE_REFRESH_TOKEN_URL: string
  readonly VITE_BASIC_AUTH_USERPOOL: string
  readonly VITE_AUTH_DOMAIN: string
  readonly VITE_USERPOOL_CLIENT_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
