import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import ErrorBoundary from './components/common/ErrorBoundary'
import PerformanceMonitor from './components/common/PerformanceMonitor'
import AuthDebugger from './components/common/AuthDebugger'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <AppProvider>
              <AppRoutes />
              <PerformanceMonitor />
              <AuthDebugger />
            </AppProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
