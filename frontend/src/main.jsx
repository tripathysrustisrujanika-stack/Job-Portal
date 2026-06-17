import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { PortalProvider } from './context/PortalContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PortalProvider>
          <App />
        </PortalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
