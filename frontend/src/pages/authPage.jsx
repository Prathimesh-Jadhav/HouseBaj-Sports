import { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Login form state
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  // Register form state
  let [registerForm, setRegisterForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  const handleLoginChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(async () => {
      // Simple validation
      if (!loginForm.email || !loginForm.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }

      //call api to login user
      try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, loginForm,{
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if(response.data.success){
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.data));
          toast.success(response.data.message);
          navigate('/collection');
          setLoading(false);
        }else{
          setError(response.data.message);
          toast.error(response.data.message);
          setLoading(false);
        }
      }catch(error){
        console.log(error);
        setError(error.response.data.message);
        toast.error(error.response.data.message);
        setLoading(false);
      }
      }, 1000);
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(async () => {
      // Validation
      if (!registerForm.firstName || !registerForm.lastName || !registerForm.email || 
          !registerForm.password || !registerForm.confirmPassword) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      
      if (registerForm.password !== registerForm.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      
      if (!registerForm.agreeToTerms) {
        setError('You must agree to the Terms and Conditions');
        setLoading(false);
        return;
      }

      registerForm ={
        ...registerForm,userName:registerForm.firstName + ' ' + registerForm.lastName
      };

      //call api to register user
      try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, registerForm,{
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if(response.data.success){
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(response.data.data));
          toast.success(response.data.message);
          navigate('/auth');
          setLoading(false);
        }else{
          setError(response.data.message);
          toast.error(response.data.message);
          setLoading(false);
        }
      }catch(error){
        console.log(error);
        setError(error.response.data.message);
        toast.error(error.response.data.message);
        setLoading(false);
      }
    }, 1000);
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              {/* Tabs */}
              <div className="flex">
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    activeTab === 'login'
                      ? 'bg-gray-800 text-rose-500 border-b-2 border-rose-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('login')}
                >
                  <div className="flex items-center justify-center">
                    <LogIn size={18} className="mr-2" />
                    Sign In
                  </div>
                </button>
                <button
                  className={`flex-1 py-4 text-center font-medium ${
                    activeTab === 'register'
                      ? 'bg-gray-800 text-rose-500 border-b-2 border-rose-500'
                      : 'text-gray-400 hover:text-white'
                  }`}
                  onClick={() => setActiveTab('register')}
                >
                  <div className="flex items-center justify-center">
                    <UserPlus size={18} className="mr-2" />
                    Create Account
                  </div>
                </button>
              </div>
              
              <div className="p-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/20 text-red-400 px-4 py-3 rounded mb-4">
                    {error}
                  </div>
                )}
                
                {/* Login Form */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="mb-5">
                      <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="your@email.com"
                        />
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-gray-400 text-sm">Password</label>
                        <a href="/forgot-password" className="text-sm text-rose-500 hover:text-rose-400">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-10 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="••••••••"
                        />
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={loginForm.rememberMe}
                        onChange={handleLoginChange}
                        className="h-4 w-4 bg-gray-800 border-gray-700 focus:ring-rose-500 text-rose-500 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-300">
                        Remember me
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded font-medium flex items-center justify-center"
                    >
                      {loading ? (
                        <span>Signing in...</span>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight size={18} className="ml-2" />
                        </>
                      )}
                    </button>
                    
                    <div className="mt-6 text-center">
                      <p className="text-gray-400 text-sm">
                        Don't have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setActiveTab('register')}
                          className="text-rose-500 hover:text-rose-400"
                        >
                          Create one now
                        </button>
                      </p>
                    </div>
                  </form>
                )}
                
                {/* Register Form */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">First Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="firstName"
                            value={registerForm.firstName}
                            onChange={handleRegisterChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                            placeholder="John"
                          />
                          <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm mb-1">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={registerForm.lastName}
                          onChange={handleRegisterChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={registerForm.email}
                          onChange={handleRegisterChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-3 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="your@email.com"
                        />
                        <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-1">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={registerForm.password}
                          onChange={handleRegisterChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-10 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="••••••••"
                        />
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number
                      </p>
                    </div>
                    
                    <div className="mb-5">
                      <label className="block text-gray-400 text-sm mb-1">Confirm Password</label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={registerForm.confirmPassword}
                          onChange={handleRegisterChange}
                          className="w-full bg-gray-800 border border-gray-700 rounded pl-10 pr-10 py-2 text-white focus:outline-none focus:border-rose-500"
                          placeholder="••••••••"
                        />
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-6">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={registerForm.agreeToTerms}
                        onChange={handleRegisterChange}
                        className="h-4 w-4 bg-gray-800 border-gray-700 focus:ring-rose-500 text-rose-500 rounded"
                      />
                      <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-300">
                        I agree to the{' '}
                        <Link to="/terms" className="text-rose-500 hover:text-rose-400">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-rose-500 hover:text-rose-400">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3 rounded font-medium flex items-center justify-center"
                    >
                      {loading ? (
                        <span>Creating account...</span>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight size={18} className="ml-2" />
                        </>
                      )}
                    </button>
                    
                    <div className="mt-6 text-center">
                      <p className="text-gray-400 text-sm">
                        Already have an account?{' '}
                        <button
                          type="button"
                          onClick={() => setActiveTab('login')}
                          className="text-rose-500 hover:text-rose-400"
                        >
                          Sign in
                        </button>
                      </p>
                    </div>
                  </form>
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

export default AuthPage;