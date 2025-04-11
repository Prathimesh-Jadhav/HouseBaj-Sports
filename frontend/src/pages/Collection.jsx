import { useEffect, useState } from 'react';
import { ShoppingCart, Search, Menu, X, ChevronDown, Sliders, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {products} from '../data';

// You would replace this with your actual image import
const basketBall = "/api/placeholder/300/300";

const Collection = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOption, setSortOption] = useState('Featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Show 8 products per page
  


  // Available categories
  const categories = [
    'All',
    'Cricket',
    'Running',
    'Badminton',
    'Swimming',
    'Yoga',
    'VolleyBall',
    'Football',
    'Hockey'
  ];
  
  
  
  // Available brands
  const brands = [
    'Nike',         // Pro Basketball Shoes, Basketball
    'Wilson',       // Premium Tennis Racket
    'Lululemon',    // Ultra Grip Yoga Mat
    'HydroFlask',   // Smart Water Bottle
    'Under Armour', // Performance Gym Gloves, Running Shorts
    'Beats',        // Wireless Sport Earbuds
    'Yonex',        // Badminton Set
    'Speedo',       // Swimming Goggles
    'Babolat',      // Tennis Racket
    'Garmin',       // Fitness Tracker Watch, Running Smartwatch
    'SG',           // Cricket Gloves
    'Manduka',      // Yoga Block & Strap Set
    'ASICS'         // Volleyball Knee Pads
  ];
  
  

  // Filter products based on all criteria
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch(sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest First':
        // In a real app, you would have a date field to sort by
        result.sort((a, b) => b.id - a.id);
        break;
      case 'Best Selling':
        // For demo, we'll prioritize items with "Bestseller" badge
        result.sort((a, b) => {
          if (a.badge === 'Bestseller' && b.badge !== 'Bestseller') return -1;
          if (b.badge === 'Bestseller' && a.badge !== 'Bestseller') return 1;
          return 0;
        });
        break;
      default: 
        // Featured - we'll keep default order
        break;
    }
    
    setFilteredProducts(result);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, selectedBrands, priceRange, sortOption]);

  // Calculate paginated products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of products when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle next/previous page navigation
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle category selection
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };
  
  // Handle brand selection
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };
  
  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  
  // Navigate to product details
  const navigateToProductDetails = (productId) => {
    navigate(`/productDetails/${productId}`);
  };
  
  // Add to cart functionality
  const addToCart = (product, e) => {
    e.stopPropagation(); // Prevent navigation to product details
    // In a real app, you would dispatch to a cart state or context
    console.log('Added to cart:', product);
    // You could show a toast notification here
  };
  
  // Add to wishlist functionality
  const addToWishlist = (product, e) => {
    e.stopPropagation(); // Prevent navigation to product details
    // In a real app, you would dispatch to a wishlist state or context
    console.log('Added to wishlist:', product);
    // You could show a toast notification here
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold">Shop Collection</h2>
            <p className="text-gray-400 mt-2">Discover our range of premium sports accessories</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4">
              <Search size={20} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for sports accessories..." 
              className="w-full bg-gray-900 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>
          
          {/* Categories and Filters */}
          <div className="flex flex-col md:flex-row justify-between mb-8">
            {/* Categories */}
            <div className="flex overflow-x-auto pb-2 mb-4 md:mb-0 no-scrollbar">
              {categories.map((category) => (
                <button 
                  key={category}
                  onClick={() => handleSelectCategory(category)}
                  className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                    selectedCategory === category 
                      ? 'bg-rose-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Filter Toggle */}
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white"
            >
              <Sliders size={18} className="mr-2" />
              Filters
              <ChevronDown size={18} className={`ml-2 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Filter Panel */}
          {filtersOpen && (
            <div className="bg-gray-900 p-6 rounded-lg mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Brand Filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Brand</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={brand} 
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        className="h-4 w-4 rounded border-gray-600 text-rose-500 focus:ring-rose-500 focus:ring-offset-gray-900"
                      />
                      <label htmlFor={brand} className="ml-2 text-sm text-gray-300">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Price Range Filter */}
              <div>
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <div className="flex justify-between mb-2">
                    <div>
                      <label htmlFor="min-price" className="block text-sm text-gray-400">Min</label>
                      <input 
                        type="number" 
                        id="min-price"
                        value={priceRange[0]} 
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-24 bg-gray-800 border border-gray-700 rounded p-1 text-white text-sm"
                        min="0"
                      />
                    </div>
                    <div>
                      <label htmlFor="max-price" className="block text-sm text-gray-400">Max</label>
                      <input 
                        type="number" 
                        id="max-price"
                        value={priceRange[1]} 
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-24 bg-gray-800 border border-gray-700 rounded p-1 text-white text-sm"
                        min={priceRange[0]}
                      />
                    </div>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-rose-500"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Sort By */}
              <div>
                <h3 className="text-lg font-medium mb-3">Sort By</h3>
                <select 
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest First</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Results summary */}
          <div className="mb-6 text-gray-400">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} results
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` for "${searchQuery}"`}
          </div>
          
          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden group cursor-pointer transform transition hover:scale-[1.02]"
                  onClick={() => navigateToProductDetails(product.id)}
                >
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover object-center" />
                    {product.badge && (
                      <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-bold rounded ${
                        product.badge === 'New' ? 'bg-blue-500' : 
                        product.badge === 'Sale' ? 'bg-green-500' :
                        'bg-rose-500'
                      }`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        className="bg-rose-500 text-white rounded-full p-3 mx-2 hover:bg-rose-600 transition"
                        onClick={(e) => addToCart(product, e)}
                      >
                        <ShoppingCart size={20} />
                      </button>
                      <button 
                        className="bg-gray-800 text-white rounded-full p-3 mx-2 hover:bg-gray-700 transition"
                        onClick={(e) => addToWishlist(product, e)}
                      >
                        <Heart size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-1">{product.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{product.brand} | {product.category}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-rose-500 font-bold">${product.price.toFixed(2)}</span>
                      <button 
                        className="text-sm text-gray-300 hover:text-white"
                        onClick={() => navigateToProductDetails(product.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-900 rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setSelectedBrands([]);
                  setPriceRange([0, 500]);
                  setSortOption('Featured');
                }}
                className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition"
              >
                Reset Filters
              </button>
            </div>
          )}
          
          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  &lt;
                </button>
                
                {/* Generate dynamic page buttons */}
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-1 rounded ${
                        currentPage === pageNumber 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                
                {totalPages > 5 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className={`px-3 py-1 rounded ${
                        currentPage === totalPages
                          ? 'bg-rose-500 text-white'
                          : 'bg-gray-800 text-white hover:bg-gray-700'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}
                
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  &gt;
                </button>
              </nav>
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

export default Collection;