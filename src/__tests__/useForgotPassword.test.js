import React from 'react'
import renderer from 'react-test-renderer'

import useForgotPassword from '../useForgotPassword'

const mockForgotPassword = jest.fn(() => ({}))
const mockSave = jest.fn(() => mockForgotPassword)
jest.mock('croods', () => ({
  useCroods: () => {
    return [
      { saving: false, saveError: undefined },
      { save: mockSave, resetState: jest.fn() },
    ]
  },
}))

jest.mock('../getBaseOpts', () => () => ({
  foo: 'bar',
}))

jest.mock('../formHelpers', () => ({
  isValidForm: () => true,
  getFieldError: () => ({}),
  commonFields: {
    email: ['email', 'email'],
  },
  getFieldProps: () => () => ({}),
}))

it('calls useForgotPassword ', () => {
  const Component = () => {
    const [
      {
        formProps: { onSubmit },
      },
    ] = useForgotPassword()
    onSubmit()
    return <div>Component</div>
  }

  renderer.create(<Component />)

  expect(mockSave).toHaveBeenCalled()
  expect(mockForgotPassword).toHaveBeenCalled()
})
