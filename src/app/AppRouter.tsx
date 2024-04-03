import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  )
}

export { AppRouter }
