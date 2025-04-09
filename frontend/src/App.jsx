import reactLogo from './assets/react.svg'
import Collection from './pages/Collection'
import LandingPage from './pages/LandingPage'
import ProductDetails from './pages/ProductDetails'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
