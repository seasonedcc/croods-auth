import { ActionOptions } from 'croods/dist/types/typeDeclarations'

export interface Headers {
  accessToken?: string
  client?: string
  expiry?: string
  tokenType?: string
  uid?: string
}

export interface ParsedHeaders {
  'Access-Token'?: string
  Client?: string
  Expiry?: string
  'Token-Type'?: string
  Uid?: string
}

export interface HeadersOptions extends ActionOptions {
  storage?: {
    setItem(a: string, b: string): void
    getItem(a: string): string
    removeItem(a: string): void
  }
  storageKey?: string
}
