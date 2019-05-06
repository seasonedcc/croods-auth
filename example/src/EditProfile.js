import React from 'react'
import { navigate } from '@reach/router'
import { useEditProfile } from 'croods-light-auth'

import Input from './Input'
import basePath from './basePath'

export default ({ setAlert, currentUser }) => {
  const [{ saving, error, formProps, fields }] = useEditProfile({
    afterSuccess: () => {
      navigate(`${basePath}/`)
      setAlert({ message: 'Profile saved', type: 'success' })
    },
  })

  return (
    <form {...formProps}>
      <h2>Edit {currentUser.email}</h2>
      <Input {...fields.text('name')} />
      <Input {...fields.email('email')} error={error} />
      <button type="submit" className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  )
}
