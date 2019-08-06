import React from 'react'
import renderer from 'react-test-renderer'

import useCurrentUser from '../useCurrentUser'

let mockCurrentUser
let mockFetchCurrentUser = jest.fn(() => jest.fn())
jest.mock('croods', () => ({
  useCroods: () => [
    { info: mockCurrentUser, fetchingInfo: false },
    { fetch: mockFetchCurrentUser },
  ],
}))

let mockAccessToken = null
jest.mock('../headersHelpers', () => ({
  getHeaders: () => ({ accessToken: mockAccessToken }),
}))

describe('when there is a currentUser', () => {
  it('does NOT call fetch', () => {
    mockFetchCurrentUser = jest.fn(() => jest.fn())
    mockCurrentUser = {
      name: 'foobar',
    }
    const Component = () => {
      useCurrentUser()
      return <div>Used current user hook</div>
    }

    const tree = renderer.create(<Component />)
    tree.update(<Component />)

    expect(mockFetchCurrentUser).not.toHaveBeenCalled()
  })
})

describe('when there is not a currentUser', () => {
  it('calls fetch', () => {
    mockFetchCurrentUser = jest.fn(() => jest.fn())
    mockCurrentUser = null
    mockAccessToken = 'foobar'
    const FooComponent = () => {
      useCurrentUser()
      return <div>Used current user hook</div>
    }

    const tree = renderer.create(<FooComponent />)
    mockCurrentUser = { foo: 'bar' }
    tree.update(<FooComponent />)

    expect(mockFetchCurrentUser).toHaveBeenCalled()
  })
})

describe('when there is not a currentUser neither a accessToken', () => {
  it('calls afterFailure', () => {
    mockCurrentUser = null
    mockAccessToken = null
    const afterFailure = jest.fn()
    const FooComponent = () => {
      useCurrentUser({ afterFailure })
      return <div>Used current user hook</div>
    }

    const tree = renderer.create(<FooComponent />)
    mockCurrentUser = { foo: 'bar' }
    tree.update(<FooComponent />)

    expect(afterFailure).toHaveBeenCalled()
  })
})
