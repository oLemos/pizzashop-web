import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div>
      <h1>Authentication</h1>

      <div>
        <Outlet />
      </div>
    </div>
  )
}
