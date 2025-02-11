import React from 'react'
import Dashboard from './Parts/Dashboard'
import { AuthProvider } from '../../Context'

const UserPage = () => {
  return (
    <div>
      <AuthProvider>
        <Dashboard/>
        </AuthProvider>
    </div>
  )
}

export default UserPage