import { Route, Routes } from 'react-router-dom'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<h1>Portal Interno 1.0.0</h1>} />
    </Routes>
  )
}

export { AppRouter }
