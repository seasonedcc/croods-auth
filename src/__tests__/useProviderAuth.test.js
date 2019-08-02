import React from 'react'
import renderer from 'react-test-renderer'
import { CroodsProvider } from 'croods'

import useSignIn from '../useSignIn'
import useProviderAuth from '../useProviderAuth'

jest.mock('../useSignIn', () => jest.fn(() => [{ signingIn: false, error: undefined }, () => new Promise(() => ({}))]))


it('calls useSignIn ', () => {
  const Component = () => {
    useProviderAuth('facebook', {})
    return <div>Component</div>
  }

  const expected = {
    path: 'auth/social_media/facebook'
  }

  renderer.create(<CroodsProvider baseUrl="https://foobar.com/api"><Component /></CroodsProvider>)

  expect(useSignIn).toHaveBeenCalledWith(expect.objectContaining(expected))
})
