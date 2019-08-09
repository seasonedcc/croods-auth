import React from 'react'
import renderer from 'react-test-renderer'

import useSignOut from '../useSignOut'
import { clearHeaders } from '../headersHelpers'

const mockSetInfo = jest.fn()
const mockSignOut = jest.fn(() => ({}))
const mockDestroy = jest.fn(() => mockSignOut)
jest.mock('croods', () => ({
  useCroods: ({ afterSuccess }) => {
    afterSuccess({})
    return [
      { destroying: false, destroyError: undefined },
      { destroy: mockDestroy, setInfo: mockSetInfo, resetState: jest.fn() },
    ]
  },
}))

jest.mock('../getBaseOpts', () => () => ({
  foo: 'bar',
}))

jest.mock('../headersHelpers', () => ({
  clearHeaders: jest.fn(),
}))

it('calls useSignOut ', () => {
  const mockCallback = jest.fn()
  const Component = () => {
    const [, signOut] = useSignOut()
    signOut(mockCallback)
    return <div>Component</div>
  }

  renderer.create(<Component />)

  expect(clearHeaders).toHaveBeenCalled()
  expect(mockDestroy).toHaveBeenCalled()
  expect(mockSignOut).toHaveBeenCalled()
})
