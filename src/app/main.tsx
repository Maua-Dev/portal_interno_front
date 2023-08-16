import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './globals.css'
import { ActionProvider } from './contexts/action_context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ActionProvider>
        <AppRouter />
      </ActionProvider>
    </Router>
  </React.StrictMode>
)
