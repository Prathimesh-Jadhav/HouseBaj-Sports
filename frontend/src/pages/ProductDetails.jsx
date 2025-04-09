import { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Star, ChevronRight, Minus, Plus, Share2, ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { productDetails } from '../data';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('description');


  // Sample product data - in a real app, you would fetch this based on the ID


  // Additional products would be here...

  useEffect(() => {
    // Simulating API fetch with delay
    const timer = setTimeout(() => {
      const foundProduct = productDetails.find(p => p.id === parseInt(id));
      setProduct(foundProduct || productDetails[0]); // Default to first product if not found
      
      // Get related products (same category but different id)
      if (foundProduct) {
        const related = productDetails
          .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // In a real app, dispatch to cart state/context
    console.log('Added to cart:', { ...product, quantity });
    // Could show a success toast here
  };

  const handleAddToWishlist = () => {
    // In a real app, dispatch to wishlist state/context
    console.log('Added to wishlist:', product);
    // Could show a success toast here
  };

  const handleShare = () => {
    // In a real app, open share dialog or copy link
    navigator.clipboard.writeText(window.location.href);
    alert('Product link copied to clipboard!');
  };

  const navigateToProduct = (productId) => {
    navigate(`/product/${productId}`);
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
          <div className="text-xl">Loading product details...</div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12">
          <div className="bg-gray-900 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-2">Product not found</h3>
            <p className="text-gray-400 mb-4">The product you're looking for doesn't exist or has been removed</p>
            <button 
              onClick={() => navigate('/collection')}
              className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition"
            >
              Return to Collection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-gray-400 mb-6">
            <button onClick={() => navigate('/')} className="hover:text-white">Home</button>
            <ChevronRight size={14} className="mx-2" />
            <button onClick={() => navigate('/collection')} className="hover:text-white">Collection</button>
            <ChevronRight size={14} className="mx-2" />
            <button onClick={() => navigate(`/collection?category=${product.category}`)} className="hover:text-white">{product.category}</button>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-gray-300">{product.name}</span>
          </div>
          
          {/* Back Button (Mobile) */}
          <button 
            onClick={goBack}
            className="flex items-center text-gray-400 hover:text-white mb-4 md:hidden"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back
          </button>
          
          {/* Product Details */}
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Product Images */}
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-96 lg:h-[500px] object-contain"
                />
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-900 rounded-lg overflow-hidden cursor-pointer ${
                      selectedImage === index ? 'ring-2 ring-rose-500' : ''
                    }`}
                  >
                    <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-20 object-cover" />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="md:w-1/2">
              {/* Badge */}
              {product.badge && (
                <span className={`inline-block px-3 py-1 text-sm font-bold rounded mb-4 ${
                  product.badge === 'New' ? 'bg-blue-500' : 
                  product.badge === 'Sale' ? 'bg-green-500' :
                  'bg-rose-500'
                }`}>
                  {product.badge}
                </span>
              )}
              
              {/* Brand */}
              <div className="text-rose-500 font-medium mb-2">{product.brand}</div>
              
              {/* Product Title */}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Ratings */}
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}
                    />
                  ))}
                </div>
                <span className="text-yellow-400 font-medium">{product.rating}</span>
                <span className="mx-2 text-gray-500">|</span>
                <span className="text-gray-400">{product.reviews} reviews</span>
              </div>
              
              {/* Price */}
              <div className="text-2xl font-bold mb-6">${product.price.toFixed(2)}</div>
              
              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-2">COLOR</h3>
                  <div className="flex space-x-2">
                    {product.colors.map((color, index) => (
                      <button 
                        key={color}
                        className={`px-4 py-2 rounded-full border ${
                          index === 0 
                            ? 'border-rose-500 bg-gray-800' 
                            : 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium text-gray-300">SIZE</h3>
                    <button className="text-sm text-rose-500 hover:underline">Size Guide</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button 
                        key={size}
                        className={`px-4 py-2 rounded-md border ${
                          index === 0 
                            ? 'border-rose-500 bg-gray-800' 
                            : 'border-gray-700 bg-gray-900 hover:bg-gray-800'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-300 mb-2">QUANTITY</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1}
                    className="bg-gray-900 border border-gray-700 rounded-l-md p-2 hover:bg-gray-800 disabled:opacity-50"
                  >
                    <Minus size={18} />
                  </button>
                  <input 
                    type="text" 
                    value={quantity} 
                    readOnly
                    className="bg-gray-900 border-t border-b border-gray-700 w-16 text-center py-2 text-white"
                  />
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= product.stock}
                    className="bg-gray-900 border border-gray-700 rounded-r-md p-2 hover:bg-gray-800 disabled:opacity-50"
                  >
                    <Plus size={18} />
                  </button>
                  <span className="ml-4 text-gray-400">
                    {product.stock} items available
                  </span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-rose-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-rose-600 flex items-center justify-center"
                >
                  <ShoppingCart size={20} className="mr-2" />
                  Add to Cart
                </button>
                <button 
                  onClick={handleAddToWishlist}
                  className="bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center"
                >
                  <Heart size={20} className="mr-2" />
                  Wishlist
                </button>
                <button 
                  onClick={handleShare}
                  className="bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 flex items-center justify-center px-4"
                >
                  <Share2 size={20} />
                </button>
              </div>
              
              {/* Product Details Tabs */}
              <div>
                <div className="flex border-b border-gray-700 mb-4">
                  <button 
                    onClick={() => setActiveTab('description')}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === 'description' 
                        ? 'text-rose-500 border-b-2 border-rose-500' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Description
                  </button>
                  <button 
                    onClick={() => setActiveTab('features')}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === 'features' 
                        ? 'text-rose-500 border-b-2 border-rose-500' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => setActiveTab('specifications')}
                    className={`px-4 py-2 text-sm font-medium ${
                      activeTab === 'specifications' 
                        ? 'text-rose-500 border-b-2 border-rose-500' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Specifications
                  </button>
                </div>
                
                <div className="text-gray-300 leading-relaxed">
                  {activeTab === 'description' && (
                    <p>{product.description}</p>
                  )}
                  
                  {activeTab === 'features' && (
                    <ul className="list-disc pl-5 space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                  
                  {activeTab === 'specifications' && (
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <div key={index} className="py-2">
                          <span className="text-gray-400">{key}:</span> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div 
                    key={relatedProduct.id} 
                    className="bg-gray-900 rounded-lg overflow-hidden group cursor-pointer transform transition hover:scale-[1.02]"
                    onClick={() => navigateToProduct(relatedProduct.id)}
                  >
                    <div className="relative">
                      <img src={relatedProduct.images[0]} alt={relatedProduct.name} className="w-full h-64 object-cover object-center" />
                      {relatedProduct.badge && (
                        <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                          relatedProduct.badge === 'New' ? 'bg-blue-500' : 
                          relatedProduct.badge === 'Sale' ? 'bg-green-500' :
                          'bg-rose-500'
                        }`}>
                          {relatedProduct.badge}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          className="bg-rose-500 text-white rounded-full p-3 mx-2 hover:bg-rose-600 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add to cart:', relatedProduct);
                          }}
                        >
                          <ShoppingCart size={20} />
                        </button>
                        <button 
                          className="bg-gray-800 text-white rounded-full p-3 mx-2 hover:bg-gray-700 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log('Add to wishlist:', relatedProduct);
                          }}
                        >
                          <Heart size={20} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium mb-1">{relatedProduct.name}</h3>
                      <p className="text-gray-400 text-sm mb-2">{relatedProduct.brand} | {relatedProduct.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-rose-500 font-bold">${relatedProduct.price.toFixed(2)}</span>
                        <button 
                          className="text-sm text-gray-300 hover:text-white"
                          onClick={() => navigateToProduct(relatedProduct.id)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
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

export default ProductDetails;