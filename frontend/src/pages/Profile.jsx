import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Edit, Camera, LogOut, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import avatar from '../assets/avatar.avif';

const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [orderHistory, setOrderHistory] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  
  // Form state for editing
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    birthdate: '',
    profileImage: '/images/profile-placeholder.jpg'
  });

  useEffect(() => {
    // Simulate fetching user data
    const timer = setTimeout(() => {
      const mockUser = {
        id: 1,
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'United States',
        birthdate: '1990-06-15',
        profileImage: '/images/profile-placeholder.jpg',
        memberSince: 'January 2023',
        totalOrders: 12
      };
      
      setUserData(mockUser);
      setFormData(mockUser);
      
      // Mock order history
      setOrderHistory([
        {
          id: 'ORD-2025-001',
          date: '2025-04-10',
          status: 'Delivered',
          total: 249.99,
          items: 3
        },
        {
          id: 'ORD-2025-002',
          date: '2025-03-25',
          status: 'Processing',
          total: 124.50,
          items: 2
        },
        {
          id: 'ORD-2025-003',
          date: '2025-03-02',
          status: 'Delivered',
          total: 89.99,
          items: 1
        }
      ]);
      
      // Get wishlist from localStorage
      try {
        const savedWishlist = localStorage.getItem('wishlist');
        const wishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
        setWishlistItems(wishlist);
      } catch (error) {
        console.error('Error loading wishlist:', error);
        setWishlistItems([]);
      }
      
      setLoading(false);
    }, 700);
    
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSaveProfile = () => {
    // In a real app, this would save to an API
    setUserData(formData);
    setEditMode(false);
    alert('Profile information updated successfully!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll use a fake URL
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({
          ...formData,
          profileImage: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeFromWishlist = (productId) => {
    try {
      // Filter out the product
      const updatedWishlist = wishlistItems.filter(item => item.id !== productId);
      
      // Update state
      setWishlistItems(updatedWishlist);
      
      // Update localStorage
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      
      alert('Item removed from wishlist');
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };
  
  const handleLogout = () => {
    // In a real app, handle logout logic
    alert('Logged out successfully');
    navigate('/login');
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-12 flex items-center justify-center">
          <div className="text-xl">Loading user profile...</div>
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
          {/* Back Button (Mobile) */}
          <button 
            onClick={goBack}
            className="flex items-center text-gray-400 hover:text-white mb-4"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back
          </button>
          
          <div className="flex flex-col md:flex-row md:space-x-8">
            {/* Left Column - User Profile Card & Navigation */}
            <div className="md:w-1/3 mb-8 md:mb-0">
              {/* User Profile Card */}
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <img 
                      src={avatar} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = '/images/profile-placeholder.jpg';
                      }}
                    />
                    {editMode && (
                      <label className="absolute bottom-0 right-0 bg-rose-500 p-2 rounded-full cursor-pointer">
                        <Camera size={16} />
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold">{userData.firstName} {userData.lastName}</h1>
                  <p className="text-gray-400 text-sm">Member since {userData.memberSince}</p>
                </div>
                
                <div className="border-t border-gray-800 pt-4">
                  <div className="flex justify-between text-center">
                    <div>
                      <p className="text-2xl font-bold">{userData.totalOrders}</p>
                      <p className="text-gray-400 text-sm">Orders</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{wishlistItems.length}</p>
                      <p className="text-gray-400 text-sm">Wishlist</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-800 mt-4 pt-4">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white p-3 rounded"
                  >
                    <LogOut size={18} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
              
              {/* Navigation Menu */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setActiveTab('personal')} 
                  className={`w-full text-left px-6 py-4 flex items-center ${activeTab === 'personal' ? 'bg-gray-800 border-l-4 border-rose-500' : 'hover:bg-gray-800'}`}
                >
                  <User size={18} className="mr-3" />
                  Personal Information
                </button>
                <button 
                  onClick={() => setActiveTab('orders')} 
                  className={`w-full text-left px-6 py-4 flex items-center ${activeTab === 'orders' ? 'bg-gray-800 border-l-4 border-rose-500' : 'hover:bg-gray-800'}`}
                >
                  <ShoppingBag size={18} className="mr-3" />
                  Order History
                </button>
                <button 
                  onClick={() => setActiveTab('wishlist')} 
                  className={`w-full text-left px-6 py-4 flex items-center ${activeTab === 'wishlist' ? 'bg-gray-800 border-l-4 border-rose-500' : 'hover:bg-gray-800'}`}
                >
                  <Heart size={18} className="mr-3" />
                  Wishlist
                </button>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="md:w-2/3">
              <div className="bg-gray-900 rounded-lg p-6">
                {/* Personal Information */}
                {activeTab === 'personal' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-bold">Personal Information</h2>
                      {!editMode ? (
                        <button 
                          onClick={() => setEditMode(true)}
                          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
                        >
                          <Edit size={16} className="mr-2" />
                          Edit
                        </button>
                      ) : (
                        <button 
                          onClick={handleSaveProfile}
                          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded flex items-center"
                        >
                          <Save size={16} className="mr-2" />
                          Save
                        </button>
                      )}
                    </div>
                    
                    {editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">First Name</label>
                          <input 
                            type="text" 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Last Name</label>
                          <input 
                            type="text" 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Email</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Phone</label>
                          <input 
                            type="text" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Address</label>
                          <input 
                            type="text" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">City</label>
                          <input 
                            type="text" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">State/Province</label>
                          <input 
                            type="text" 
                            name="state" 
                            value={formData.state} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Zip/Postal Code</label>
                          <input 
                            type="text" 
                            name="zipCode" 
                            value={formData.zipCode} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Country</label>
                          <input 
                            type="text" 
                            name="country" 
                            value={formData.country} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-400 text-sm mb-1">Birthdate</label>
                          <input 
                            type="date" 
                            name="birthdate" 
                            value={formData.birthdate} 
                            onChange={handleInputChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center py-2 border-b border-gray-800">
                          <User className="text-gray-400 mr-3" size={18} />
                          <div>
                            <div className="text-sm text-gray-400">Full Name</div>
                            <div>{userData.firstName} {userData.lastName}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center py-2 border-b border-gray-800">
                          <Mail className="text-gray-400 mr-3" size={18} />
                          <div>
                            <div className="text-sm text-gray-400">Email</div>
                            <div>{userData.email}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center py-2 border-b border-gray-800">
                          <Phone className="text-gray-400 mr-3" size={18} />
                          <div>
                            <div className="text-sm text-gray-400">Phone</div>
                            <div>{userData.phone}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center py-2 border-b border-gray-800">
                          <MapPin className="text-gray-400 mr-3" size={18} />
                          <div>
                            <div className="text-sm text-gray-400">Address</div>
                            <div>{userData.address}, {userData.city}, {userData.state} {userData.zipCode}</div>
                            <div>{userData.country}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center py-2 border-b border-gray-800">
                          <Calendar className="text-gray-400 mr-3" size={18} />
                          <div>
                            <div className="text-sm text-gray-400">Birthdate</div>
                            <div>{new Date(userData.birthdate).toLocaleDateString()}</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Order History */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">Order History</h2>
                    
                    {orderHistory.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="text-left bg-gray-800">
                              <th className="px-4 py-3 text-sm font-medium text-gray-300">Order ID</th>
                              <th className="px-4 py-3 text-sm font-medium text-gray-300">Date</th>
                              <th className="px-4 py-3 text-sm font-medium text-gray-300">Items</th>
                              <th className="px-4 py-3 text-sm font-medium text-gray-300">Total</th>
                              <th className="px-4 py-3 text-sm font-medium text-gray-300">Status</th>
                              <th className="px-4 py-3 text-sm font-medium text-gray-300">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderHistory.map((order) => (
                              <tr key={order.id} className="border-b border-gray-800">
                                <td className="px-4 py-4">{order.id}</td>
                                <td className="px-4 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="px-4 py-4">{order.items}</td>
                                <td className="px-4 py-4">${order.total.toFixed(2)}</td>
                                <td className="px-4 py-4">
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                                    order.status === 'Processing' ? 'bg-blue-500/20 text-blue-400' :
                                    order.status === 'Cancelled' ? 'bg-red-500/20 text-red-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-4 py-4">
                                  <button 
                                    className="text-rose-500 hover:text-rose-400"
                                    onClick={() => navigate(`/order/${order.id}`)}
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">You haven't placed any orders yet.</p>
                        <button 
                          onClick={() => navigate('/collection')}
                          className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded"
                        >
                          Shop Now
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Wishlist */}
                {activeTab === 'wishlist' && (
                  <div>
                    <h2 className="text-xl font-bold mb-6">My Wishlist</h2>
                    
                    {wishlistItems.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlistItems.map((item) => (
                          <div key={item.id} className="bg-gray-800 rounded-lg overflow-hidden flex">
                            <img 
                              src={item.images && item.images[0]} 
                              alt={item.name} 
                              className="w-24 h-24 object-cover"
                              onError={(e) => {
                                e.target.src = '/images/product-placeholder.jpg';
                              }}
                            />
                            <div className="p-3 flex-1">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-rose-500 font-bold mt-1">${item.price?.toFixed(2)}</p>
                              <div className="flex justify-between items-center mt-2">
                                <button 
                                  onClick={() => navigate(`/product/${item.id}`)}
                                  className="text-sm text-gray-300 hover:text-white"
                                >
                                  View Details
                                </button>
                                <button 
                                  onClick={() => removeFromWishlist(item.id)}
                                  className="text-sm text-red-400 hover:text-red-300"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-400">Your wishlist is empty.</p>
                        <button 
                          onClick={() => navigate('/collection')}
                          className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded"
                        >
                          Discover Products
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
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
};

// Add missing icon component for orders tab
const ShoppingBag = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  );
};

// Add missing icon component for wishlist tab
const Heart = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || 24}
      height={props.size || 24}
      viewBox="0 0 24 24"
      fill={props.filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
    </svg>
  );
};

export default UserProfile;