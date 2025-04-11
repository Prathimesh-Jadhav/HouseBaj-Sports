import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, Heart, User } from 'lucide-react';
import heroImg from '../assets/heroImg.jpg';
import { categories } from '../data';
import { featuredProducts } from '../data';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const LandingPage = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 px-4" id='hero'>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">Elevate Your <span className="text-rose-600">Game</span></h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8">Premium sports accessories for champions. Discover our elite collection designed for performance and style.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-md font-medium" onClick={() => navigate('/collection')}>Shop Now</button>
                <a href='#categories' className="border border-white hover:border-rose-600 hover:text-rose-600 px-8 py-3 rounded-md font-medium">Explore Categories</a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative flex gap-6 justify-between items-center">
                <div className="w-full h-full absolute bg-rose-600/20 rounded-full blur-3xl"></div>
                <img src={heroImg} alt="Premium sports accessories" className="relative z-10 rounded-lg object-cover mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 px-4 bg-gray-900" id='categories'>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Explore Categories</h2>
            <p className="text-gray-400">Discover premium sports accessories for every need</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category) => (
              <div key={category.id} className="group relative overflow-hidden rounded-lg bg-gray-800 hover:shadow-lg transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img src={category.image} alt={category} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 p-4 z-20">
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <button className="mt-2 text-rose-400 group-hover:text-rose-600 flex items-center text-sm">
                    Shop Now <ChevronDown className="ml-1 h-4 w-4 rotate-270" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 px-4" id='featured'>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <button className="text-rose-500 hover:text-rose-600">View All</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-gray-900 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-rose-600 text-white px-2 py-1 text-xs rounded">-{product.discount}</div>
                  )}
                  <button className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 rounded-full">
                    <Heart size={18} className="text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-rose-500 font-semibold">${product.price}</span>
                      {product.discount && (
                        <span className="ml-2 text-gray-400 line-through text-sm">${(product.price * 1.25).toFixed(2)}</span>
                      )}
                    </div>
                    <button className="p-2 bg-rose-600 hover:bg-rose-700 rounded-full">
                      <ShoppingBag size={16} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">What Our Customers Say</h2>
            <p className="text-gray-400">Join thousands of satisfied athletes and fitness enthusiasts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Alex Johnson", role: "Marathon Runner", text: "The running accessories I bought from HouseBaj have significantly improved my performance. Quality products worth every penny!" },
              { name: "Sarah Williams", role: "Fitness Trainer", text: "As a professional trainer, I need reliable equipment. HouseBaj delivers exceptional quality that my clients and I can depend on." },
              { name: "Mark Thompson", role: "Basketball Coach", text: "HouseBaj has everything my team needs. From training gear to recovery accessories, they offer premium products that last." }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-700 mr-4"></div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 md:py-20 px-4" id='contact'>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-300 mb-8">Subscribe to get exclusive offers, new product alerts, and training tips</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow bg-gray-800 border border-gray-700 rounded-md px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium">Subscribe</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">
                <span className="text-rose-600">House</span>Baj
              </h3>
              <p className="text-gray-400 mb-4">Premium sports accessories for athletes and fitness enthusiasts.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-rose-500">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-rose-500">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-rose-500">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-rose-500">All Products</a></li>
                <li><a href="#" className="hover:text-rose-500">New Arrivals</a></li>
                <li><a href="#" className="hover:text-rose-500">Featured</a></li>
                <li><a href="#" className="hover:text-rose-500">Discounts</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-rose-500">Contact Us</a></li>
                <li><a href="#" className="hover:text-rose-500">FAQs</a></li>
                <li><a href="#" className="hover:text-rose-500">Shipping</a></li>
                <li><a href="#" className="hover:text-rose-500">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-rose-500">About Us</a></li>
                <li><a href="#" className="hover:text-rose-500">Blog</a></li>
                <li><a href="#" className="hover:text-rose-500">Careers</a></li>
                <li><a href="#" className="hover:text-rose-500">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} HouseBaj. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;