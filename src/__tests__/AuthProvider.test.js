import React from 'react'
import renderer from 'react-test-renderer'
import { CroodsProvider } from 'croods'

import AuthProvider, { useUserFromContext } from '../AuthProvider'

jest.mock('../useCurrentUser', () =>
  jest.fn(() => [
    { validating: false, currentUser: { id: 1, firstName: 'Foobar' } },
    () => new Promise(() => ({})),
  ]),
)

it('calls useSignIn ', () => {
  const Component = () => {
    const [{ currentUser }] = useUserFromContext()
    return <div>{currentUser.firstName}</div>
  }

  const tree = renderer
    .create(
      <CroodsProvider baseUrl="https://foobar.com/api">
        <AuthProvider>
          <Component />
        </AuthProvider>
      </CroodsProvider>,
    )
    .toJSON()

  expect(tree).toMatchInlineSnapshot(`
    <div>
      Foobar
    </div>
  `)
})
