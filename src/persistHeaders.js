import get from 'lodash/get'
import isFunction from 'lodash/isFunction'

const KEY = 'authCredentials'

export const saveHeaders = (response, options) => {
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

export const clearHeaders = options => {
  const { storage = localStorage, storageKey = KEY } = options || {}
  storage.removeItem(storageKey)
}

export const getHeaders = options => {
  const { storage = localStorage, storageKey = KEY } = options || {}
  try {
    const credentials = JSON.parse(storage.getItem(storageKey))
    return credentials || {}
  } catch (error) {
    return {}
  }
}

export const getParsedHeaders = options => {
  const credentials = getHeaders(options)
  return {
    'Access-Token': credentials.accessToken,
    Client: credentials.client,
    Expiry: credentials.expiry,
    'Token-Type': credentials.tokenType,
    Uid: credentials.uid,
  }
}
