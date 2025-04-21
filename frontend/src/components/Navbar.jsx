import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Heart, Search, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);

  // Handle scroll event to add background to navbar when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Get cart and wishlist item counts from localStorage
  useEffect(() => {
    const updateCounts = () => {
      try {
        // Get cart count
        const savedCart = localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        setCartItemCount(cart.length);
        
        // Get wishlist count
        const savedWishlist = localStorage.getItem('wishlist');
        const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        setWishlistItemCount(wishlist.length);
      } catch (error) {
        console.error('Error loading cart/wishlist counts:', error);
      }
    };

    // Update counts on mount
    updateCounts();

    // Set up a listener for storage events to update counts when cart/wishlist changes
    window.addEventListener('storage', updateCounts);
    
    // Also check periodically (for updates made in the same tab)
    const intervalId = setInterval(updateCounts, 2000);
    
    return () => {
      window.removeEventListener('storage', updateCounts);
      clearInterval(intervalId);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled || isMenuOpen ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              HouseBaj<span className="text-rose-500">Sports</span>
            </Link>
          </div>
        
          
          {/* Right Icons */}
          <div className="flex items-center">
            
            <button 
              className="text-gray-300 hover:text-white p-2 rounded-full relative"
              onClick={() => navigate('/wishlist')}
            >
              <Heart size={22} />
              {wishlistItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistItemCount}
                </span>
              )}
            </button>
            
            <button 
              className="text-gray-300 hover:text-white p-2 rounded-full relative"
              onClick={() => navigate('/cart')}
            >
              <ShoppingCart size={22} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              className="text-gray-300 hover:text-white p-2 rounded-full"
              onClick={() => navigate('/profile')}
            >
              <User size={22} />
            </button>
            
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-300 hover:text-white p-2 rounded-full ml-1"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <button 
              onClick={() => handleNavigate('/')}
              className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavigate('/collection')}
              className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
            >
              Collection
            </button>
            <button 
              onClick={() => handleNavigate('/wishlist')}
              className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
            >
              Wishlist
            </button>
            <button 
              onClick={() => handleNavigate('/cart')}
              className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
            >
              Cart
            </button>
            <button 
              onClick={() => handleNavigate('/account')}
              className="block w-full text-left text-gray-300 hover:text-white hover:bg-gray-800 px-3 py-2 rounded"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;