import getBaseOpts from '../getBaseOpts'

describe('when the method is signIn', () => {
  const method = 'signIn'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'signIn',
        path: 'auth/sign_in',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is signUp', () => {
  const method = 'signUp'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'signUp',
        path: 'auth',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is signOut', () => {
  const method = 'signOut'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'signOut',
        path: 'auth/sign_out',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is resetPassword', () => {
  const method = 'resetPassword'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'reset',
        path: 'auth/password',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is forgotPassword', () => {
  const method = 'forgotPassword'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'forgot',
        path: 'auth/password',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is deleteAccount', () => {
  const method = 'deleteAccount'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'delete',
        path: 'auth',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is editProfile', () => {
  const method = 'editProfile'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        stateId: 'edit',
        path: 'auth',
        updateRootInfo: true,
      }),
    )
  })
})

describe('when the method is currentUser', () => {
  const method = 'currentUser'
  it('returns correctly', () => {
    expect(getBaseOpts({}, method)).toEqual(
      expect.objectContaining({
        name: 'auth',
        path: 'auth/validate_token',
        updateRootInfo: true,
      }),
    )
  })
})

describe('parseResponse', () => {
  const method = 'currentUser'
  it('returns correctly', () => {
    const response = {
      data: {
        data: { name: 'foobar' },
      },
    }

    const { parseResponse } = getBaseOpts({}, method)

    expect(parseResponse(response)).toEqual(response.data.data)
  })
})
