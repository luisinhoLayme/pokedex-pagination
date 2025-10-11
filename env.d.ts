/// <reference types="vite/client" />
declare module '*.vue';

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_POKE_API_URI: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
