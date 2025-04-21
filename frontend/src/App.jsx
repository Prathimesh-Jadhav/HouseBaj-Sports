import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/LandingPage';
import Collection from './pages/Collection';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/WishList';
// import NotFound from './pages/NotFound';
import UserProfile from './pages/Profile';
import AuthPage from './pages/authPage';
import ProductUpload from './pages/productUpload';
import Chat from './pages/Chat';

import {ToastContainer} from 'react-toastify';

function App() {
  return (

    <>
    <ToastContainer/> 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/uploadProduct" element={<ProductUpload />} />
        <Route path='/chat' element={<Chat/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;