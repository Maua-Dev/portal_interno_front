/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STAGE: string
  readonly VITE_MSS_API_URL: string
  readonly VITE_REFRESH_TOKEN_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
