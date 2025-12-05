import { Outlet } from 'react-router-dom'

function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">AI CaseManager</h1>
          <p className="text-primary-100">Smart Appointment & Case Management</p>
        </div>

        <Outlet />

        {/* Footer */}
        <div className="text-center mt-8 text-primary-100 text-sm">
          <p>&copy; 2024 AI CaseManager. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
