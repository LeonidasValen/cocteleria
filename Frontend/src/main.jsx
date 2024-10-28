import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import { CoctelProvider } from './context/CoctelContext.jsx'
import { GetCoctelProvider } from './context/GetCoctelContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CoctelProvider>
        <GetCoctelProvider>
          <App />
        </GetCoctelProvider>
      </CoctelProvider>
    </AuthProvider>
  </StrictMode>,
)
