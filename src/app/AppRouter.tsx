import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export { AppRouter }
