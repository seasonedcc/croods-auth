import React from 'react'
import renderer from 'react-test-renderer'

import useSignUp from '../useSignUp'
import { saveHeaders } from '../headersHelpers'

const mockSetInfo = jest.fn()
const mockSignIn = jest.fn(() => ({}))
const mockSave = jest.fn(() => mockSignIn)
jest.mock('croods', () => ({
  useCroods: ({ afterSuccess }) => {
    afterSuccess({})
    return [
      { saving: false, saveError: undefined },
      { save: mockSave, setInfo: mockSetInfo, resetState: jest.fn() },
    ]
  },
}))

jest.mock('../getBaseOpts', () => () => ({
  foo: 'bar',
}))

jest.mock('../headersHelpers', () => ({
  saveHeaders: jest.fn(),
}))

jest.mock('../formHelpers', () => ({
  isValidForm: () => true,
  getFieldError: () => ({}),
  commonFields: {
    email: ['email', 'email'],
    password: ['password', 'password'],
    passwordConfirmation: ['passwordConfirmation', 'passwordConfirmation'],
  },
  getFieldProps: () => () => ({}),
}))

it('calls useSignUp ', () => {
  const Component = () => {
    const [
      {
        formProps: { onSubmit },
      },
    ] = useSignUp()
    onSubmit()
    return <div>Component</div>
  }

  renderer.create(<Component />)

  expect(saveHeaders).toHaveBeenCalled()
  expect(mockSave).toHaveBeenCalled()
  expect(mockSignIn).toHaveBeenCalled()
})
