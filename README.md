# Croods-Auth

Croods-auth is another layer of abstraction on top of Croods, providing you with a ready-to-use solution for user authentication and permission control.

Bellow is a simple example of its usage with @reach/router:

```js
import { CroodsProvider } from 'croods'
import { Auth, authHeaders } from 'croods-auth'

export default props => (
  <CroodsProvider headers={authHeaders} baseUrl="https://foo.bar">
    <Router>
      <Auth
        Component={SomeBlockedPage}
        path="/"
        unauthorized={() => redirect('/sign-in')}
      />
      <SignIn path="/sign-in" />
    </Router>
  </CroodsProvider>
)
```

Main concepts to notice here:

- **authHeaders:** Provides Croods with headers from the storage for usage on Croods requests. Eg.: Auth-Token, Uid, Client, Token-Type and Expiry.
- **Auth:** Used for checking permissions required for a component.

And then we implement our SignIn page:

```js
import { useSignIn } from 'croods-auth'

const Input = ({ name, label = name, ...props }) => (
  <div className="form-group">
    <label htmlFor={name}>{label}</label>
    <input {...props} className="form-control" id={name} />
  </div>
)

export default props => {
  const [{ signingIn, error, ...config }] = useSignIn({
    afterSuccess: () => navigate(`/home`),
  })
  return (
    <form {...config.formProps}>
      <h2>Sign In</h2>
      <Input {...config.emailProps} label="Email address" />
      <Input {...config.passwordProps} />
      <button type="submit" className="btn btn-primary">
        {signingIn ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  )
}
```

There are hooks available for all usual authentication operations (sign up, edit profile, etc).

Read more about it [on the Docs](https://croods.netlify.com/docs/cauth-intro)!
