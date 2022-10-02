import { googleLogout } from '@react-oauth/google'
import { useLogoutMutation, useCheckAuthQuery } from '~/store/queries'

export const Profile = () => {
  const [logout] = useLogoutMutation()
  const { data: authData } = useCheckAuthQuery()
  return (
    <div>
      {authData && (
        <>
          <h1>Profile</h1>
          <h3>{authData.name}</h3>
          <h3>{authData.email}</h3>
          <img src={authData.image} referrerPolicy="no-referrer" />

          <button
            onClick={() => {
              googleLogout()
              logout()
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  )
}
