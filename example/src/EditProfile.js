import React from 'react'
import { navigate } from '@reach/router'
import { useEditProfile } from 'croods-auth'

import Input from './Input'
import Error from './Error'
import basePath from './basePath'
import { presence, minWords, email } from './validations'

export default ({ setAlert, currentUser }) => {
  const [{ saving, error, formProps, fieldProps }] = useEditProfile({
    afterSuccess: () => {
      navigate(`${basePath}/`)
      setAlert({ message: 'Profile saved', type: 'success' })
    },
  })

  return (
    <form {...formProps}>
      <h2>Edit {currentUser.email}</h2>
      <Input {...fieldProps('text', 'name', [presence(), minWords(2)])} />
      <Input {...fieldProps('email', 'email', [presence(), email()])} />
      <Error message={error} />
      <button type="submit" className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
