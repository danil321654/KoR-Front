import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { Desk, Profile } from './components'
import { useLoginMutation, useCheckAuthQuery } from './store/queries'

export const App = () => {
  const { data, isLoading } = useCheckAuthQuery()
  const [login] = useLoginMutation()

  if (isLoading) {
    return <>Loading...</>
  }

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      {data ? (
        <Desk />
      ) : (
        <GoogleLogin
          useOneTap
          onSuccess={(credentialResponse) => {
            login(credentialResponse.credential!)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      )}
    </GoogleOAuthProvider>
  )
}
