import {
  clearHeaders,
  saveHeaders,
  getHeaders,
  getParsedHeaders,
} from '../persistHeaders'

afterEach(jest.clearAllMocks)

const storage = {
  setItem: jest.fn(),
  removeItem: jest.fn(),
  getItem: jest.fn(() => '{"accessToken":"foo","client":"Browser"}'),
}

describe('saveHeaders', () => {
  const response = { headers: { 'access-token': 'foo', client: 'Browser' } }
  it('does not save if there is no accessToken', () => {
    saveHeaders(response, { storage, storageKey: 'myKey' })
    expect(storage.setItem).toHaveBeenCalledWith(
      'myKey',
      '{"accessToken":"foo","client":"Browser"}',
    )
  })

  it('has a default key', () => {
    saveHeaders(response, { storage })
    expect(storage.setItem).toHaveBeenCalledWith(
      'authCredentials',
      '{"accessToken":"foo","client":"Browser"}',
    )
  })
})

describe('clearHeaders', () => {
  it('clears the items in storage', () => {
    clearHeaders({ storage, storageKey: 'myKey' })
    expect(storage.removeItem).toHaveBeenCalledWith('myKey')
  })

  it('has a default key', () => {
    clearHeaders({ storage })
    expect(storage.removeItem).toHaveBeenCalledWith('authCredentials')
  })
})

describe('getHeaders', () => {
  it('gets headers from storage', async () => {
    const result = await getHeaders({ storage, storageKey: 'myKey' })
    expect(storage.getItem).toHaveBeenCalledWith('myKey')
    expect(result).toMatchObject({
      accessToken: 'foo',
      client: 'Browser',
    })
  })

  it('will return empty object instead of breaking', async () => {
    storage.getItem.mockImplementationOnce(() => null)
    const result = await getHeaders({ storage })
    expect(storage.getItem).toHaveBeenCalledWith('authCredentials')
    expect(result).toEqual({})
  })
})

describe('getParsedHeaders', () => {
  it('gets headers from storage', async () => {
    const result = await getParsedHeaders({ storage, storageKey: 'myKey' })
    expect(storage.getItem).toHaveBeenCalledWith('myKey')
    expect(result).toMatchObject({
      'Access-Token': 'foo',
      Client: 'Browser',
    })
  })
})
