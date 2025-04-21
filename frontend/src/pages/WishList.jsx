import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get wishlist items from localStorage
    const loadWishlistItems = () => {
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        const parsedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        setWishlistItems(parsedWishlist);
      } catch (error) {
        console.error('Error loading wishlist from localStorage:', error);
        setWishlistItems([]);
      }
      setLoading(false);
    };

    loadWishlistItems();
  }, []);

  // Update localStorage whenever wishlist changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems, loading]);

  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const addToCart = (product) => {
    // Get current cart
    try {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      
      // Check if product already exists in cart
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If exists, increment quantity
        cart[existingItemIndex].quantity += 1;
      } else {
        // If not, add new item with quantity 1
        cart.push({
          ...product,
          quantity: 1
        });
      }
      
      // Save updated cart to localStorage
      localStorage.setItem('cart', JSON.stringify(cart));
      
      // Optionally remove from wishlist after adding to cart
      removeFromWishlist(product.id);
      
      // Show success message
      alert(`${product.name} has been added to your cart!`);
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button 
            onClick={goBack}
            className="flex items-center text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back to Shopping
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading wishlist...</div>
            </div>
          ) : wishlistItems.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <div className="flex justify-center mb-4">
                <Heart size={64} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
              <p className="text-gray-400 mb-6">Save items you love for later</p>
              <button 
                onClick={() => navigate('/collection')}
                className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-64 object-cover cursor-pointer" 
                      onClick={() => navigateToProduct(item.id)}
                    />
                    {item.badge && (
                      <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                        item.badge === 'New' ? 'bg-blue-500' : 
                        item.badge === 'Sale' ? 'bg-green-500' :
                        'bg-rose-500'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="p-4">
                    <h3 
                      className="text-lg font-medium mb-1 cursor-pointer hover:text-rose-500"
                      onClick={() => navigateToProduct(item.id)}
                    >
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">{item.brand} | {item.category}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-rose-500 font-bold">${item.price.toFixed(2)}</span>
                      <div className="text-sm text-yellow-400 flex items-center">
                        {item.rating} ★ ({item.reviews} reviews)
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => addToCart(item)}
                        className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-600 flex items-center justify-center"
                      >
                        <ShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="bg-gray-800 text-white py-2 px-3 rounded-lg hover:bg-gray-700 flex items-center justify-center"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-400 text-sm">
            &copy; 2025 HouseBaj Sports. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Wishlist;