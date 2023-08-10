import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <AppRouter />
    </Router>
  </React.StrictMode>,
)
