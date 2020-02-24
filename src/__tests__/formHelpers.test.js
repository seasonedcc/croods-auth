import {
  isValidForm,
  validate,
  confirmation,
  presence,
  email,
  minLength,
  getFieldError,
  additionalCheckerPasswordConfirmation,
} from '../formHelpers'

describe('isValidForm', () => {
  describe('when there is no errors', () => {
    const formState = {
      errors: {},
    }

    it('returns true', () => {
      expect(isValidForm(formState)).toBeTruthy()
    })
  })

  describe('when there is errors', () => {
    const formState = {
      errors: {
        email: 'invalid',
      },
    }

    it('returns true', () => {
      expect(isValidForm(formState)).toBeFalsy()
    })
  })
})

describe('validate', () => {
  describe('when validators return errors', () => {
    it('returns the first error', () => {
      const validators = [() => 'Fail', () => 'Missing info']

      const value = 10
      const values = { foo: 10, bar: 11, foobar: 12 }

      expect(validate(validators)(value, values)).toEqual('Fail')
    })
  })

  describe('when validators do NOT return errors', () => {
    it('returns the first error', () => {
      const validators = [() => undefined, () => undefined]

      const value = 10
      const values = { foo: 10, bar: 11, foobar: 12 }

      expect(validate(validators)(value, values)).toBeUndefined()
    })
  })
})

describe('confirmation', () => {
  describe('when the values are different', () => {
    const values = {
      foo: 'foo',
      bar: 'bar',
    }
    it('returns an error', () => {
      expect(confirmation('bar')(values.foo, values)).toEqual(
        `Must be equal to bar`,
      )
    })
  })
  describe('when the values are equal', () => {
    const values = {
      foo: 'foo',
    }
    it('returns undefined', () => {
      expect(confirmation('foo')(values.foo, values)).toBeUndefined()
    })
  })
})

describe('email', () => {
  describe('when there is a valid email', () => {
    it('returns undefined', () => {
      const validEmail = 'foo@bar.com'

      expect(email()(validEmail)).toBeUndefined()
    })
  })

  describe('when there is NOT a valid email', () => {
    it('returns an error', () => {
      const invalidEmail = 'ffoooo.com'

      expect(email()(invalidEmail)).toEqual('Invalid email')
    })
  })
})

describe('presence', () => {
  describe('when there is a value', () => {
    it('returns undefined', () => {
      const value = 10

      expect(presence()(value)).toBeUndefined()
    })
  })

  describe('when there is NOT a value', () => {
    it('returns an error', () => {
      const value = null

      expect(presence()(value)).toEqual('Is required')
    })
  })
})

describe('minLength', () => {
  describe('when there is a value with more than #chars characters', () => {
    it('returns undefined', () => {
      const chars = 3
      const value = 'foooobar'

      expect(minLength(chars)(value)).toBeUndefined()
    })
  })

  describe('when there is a value with less than #chars characters', () => {
    it('returns an error', () => {
      const chars = 50
      const value = 'foooobar'

      expect(minLength(chars)(value)).toEqual(`Minimum ${chars} characters`)
    })
  })
})

describe('getFieldError', () => {
  describe('when there is an error and the field was touched', () => {
    it('returns the error', () => {
      const formState = {
        errors: {
          foobar: 'Fooobar error',
        },
      }
      const fieldName = 'foobar'

      expect(getFieldError(formState)(fieldName)).toEqual('Fooobar error')
    })
  })

  describe('when there is NOT an error', () => {
    it('returns false', () => {
      const formState = {
        errors: {
          foobar: undefined,
        },
      }
      const fieldName = 'foobar'

      expect(getFieldError(formState)(fieldName)).toBeFalsy()
    })
  })
})

describe('additionalCheckerPasswordConfirmation', () => {
  it('calls setFieldError when password fields are different', () => {
    const formState = {
      touched: {},
      values: {
        password: '123',
        passwordConfirmation: '12',
      },
      setFieldError: jest.fn(),
    }

    const result = additionalCheckerPasswordConfirmation(formState)
    expect(result).toBeFalsy()
    expect(formState.setFieldError).toHaveBeenCalled()
  })

  it('DOES NOT call setFieldError when password fields are equal', () => {
    const formState = {
      touched: {},
      values: {
        password: '123',
        passwordConfirmation: '123',
      },
      setFieldError: jest.fn(),
    }

    const result = additionalCheckerPasswordConfirmation(formState)

    expect(result).toBeTruthy()
    expect(formState.setFieldError).not.toHaveBeenCalled()
  })
})
