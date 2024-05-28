import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './AppRouter.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './globals.css'
import { ActionProvider } from './contexts/action_context.tsx'
import { ThemeProvider } from './contexts/theme_context.tsx'
import { ModalProvider } from './contexts/modal_context.tsx'
import { MemberProvider } from './contexts/member_context.tsx'
import { ProjectProvider } from './contexts/project_context.tsx'
import { ActionModalProvider } from './components/ActionModal/contexts/action_modal_context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThemeProvider>
        <ProjectProvider>
          <ActionProvider>
            <MemberProvider>
              <ModalProvider>
                <ActionModalProvider>
                  <AppRouter />
                </ActionModalProvider>
              </ModalProvider>
            </MemberProvider>
          </ActionProvider>
        </ProjectProvider>
      </ThemeProvider>
    </Router>
  </React.StrictMode>
)
