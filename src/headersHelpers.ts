import get from 'lodash/get'
import isFunction from 'lodash/isFunction'
import { AxiosResponse } from 'axios'
import { HeadersOptions, Headers, ParsedHeaders } from './typeDeclarations'

const KEY = 'authCredentials'

export function authHeaders({ storage, storageKey }: HeadersOptions = {}) {
  return getParsedHeaders({ storage, storageKey })
}

export function saveHeaders(
  response: AxiosResponse,
  options: HeadersOptions,
): void {
  const { storage = localStorage, storageKey = KEY } = options || {}
  if (isFunction(storage.setItem)) {
    const credentials = {
      accessToken: get(response, 'headers.access-token'),
      client: get(response, 'headers.client'),
      expiry: get(response, 'headers.expiry'),
      tokenType: get(response, 'headers.token-type'),
      uid: get(response, 'headers.uid'),
    }

    if (credentials.accessToken) {
      storage.setItem(storageKey, JSON.stringify(credentials))
    }
  }
}

export function clearHeaders(options: HeadersOptions): void {
  const { storage = localStorage, storageKey = KEY } = options || {}
  storage.removeItem(storageKey)
}

export function getHeaders(options: HeadersOptions): Headers {
  const { storage = localStorage, storageKey = KEY } = options || {}
  try {
    const credentials = JSON.parse(storage.getItem(storageKey))
    return credentials || {}
  } catch (error) {
    return {}
  }
}

export function getParsedHeaders(options: HeadersOptions): ParsedHeaders {
  const credentials = getHeaders(options)
  return {
    'Access-Token': credentials.accessToken,
    Client: credentials.client,
    Expiry: credentials.expiry,
    'Token-Type': credentials.tokenType,
    Uid: credentials.uid,
  }
}
