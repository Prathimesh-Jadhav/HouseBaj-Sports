import { useState, useEffect } from 'react';
import { Trash2, Minus, Plus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get cart items from localStorage
    const loadCartItems = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        const parsedCart = savedCart ? JSON.parse(savedCart) : [];
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        setCartItems([]);
      }
      setLoading(false);
    };

    loadCartItems();
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // Assuming 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const proceedToCheckout = () => {
    // In a real app, this would navigate to a checkout page
    alert('Proceeding to checkout...');
  };

  const goBack = () => {
    navigate(-1);
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
            Continue Shopping
          </button>
          
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-xl">Loading cart...</div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-gray-900 rounded-lg p-12 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag size={64} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet</p>
              <button 
                onClick={() => navigate('/collection')}
                className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 transition font-medium"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-gray-300 font-medium">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-800 items-center">
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6 flex items-center space-x-4">
                        <img 
                          src={item.images[0]} 
                          alt={item.name} 
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-sm text-gray-400 mb-1">{item.brand}</div>
                          {item.selectedColor && (
                            <div className="text-sm text-gray-400">Color: {item.selectedColor}</div>
                          )}
                          {item.selectedSize && (
                            <div className="text-sm text-gray-400">Size: {item.selectedSize}</div>
                          )}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center text-rose-500 text-sm mt-2 md:hidden"
                          >
                            <Trash2 size={14} className="mr-1" />
                            Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 text-center">
                        <div className="md:hidden text-gray-400 mb-1">Price:</div>
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex justify-center">
                        <div className="md:hidden text-gray-400 mb-1 mr-2">Quantity:</div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                            disabled={item.quantity <= 1}
                            className="bg-gray-800 border border-gray-700 rounded-l-md p-1 hover:bg-gray-700 disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <input 
                            type="text" 
                            value={item.quantity} 
                            readOnly
                            className="bg-gray-800 border-t border-b border-gray-700 w-10 text-center py-1 text-white"
                          />
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                            className="bg-gray-800 border border-gray-700 rounded-r-md p-1 hover:bg-gray-700"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 text-center">
                        <div className="md:hidden text-gray-400 mb-1">Total:</div>
                        <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                      
                      {/* Remove button (desktop) */}
                      <div className="hidden md:flex md:items-center md:justify-center">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax (10%)</span>
                      <span>${calculateTax().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-gray-800">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">${calculateTotal().toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={proceedToCheckout}
                    className="w-full bg-rose-500 text-white py-3 rounded-lg font-medium hover:bg-rose-600 transition"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-6 text-sm text-gray-400 text-center">
                    Free shipping on all orders over $50
                  </div>
                </div>
              </div>
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

export default Cart;