import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export { AppRouter }
