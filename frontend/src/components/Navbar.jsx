import React, { useState } from 'react'
import { ShoppingBag, Search, Menu, X, ChevronDown, Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate= useNavigate();

    return (
        < div className="fixed w-full bg-black/90 backdrop-blur-sm z-50" >
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <div className="flex items-center hover:cursor-pointer" onClick={() => navigate('/')}>
                        <h1 className="text-2xl font-bold">
                            <span className="text-rose-600">House</span>Baj
                        </h1>
                    </div>

                    {/* Desktop Nav */}

                    {
                        location.pathname == '/' && (

                            <nav className="hidden md:flex space-x-8">
                                <a href="#hero" className="hover:text-rose-500 font-medium">Home</a>
                                <a href="#categories" className="hover:text-rose-500 font-medium">Categories</a>
                                <a href="#featured" className="hover:text-rose-500 font-medium">Featured</a>
                                <a href="#contact" className="hover:text-rose-500 font-medium">Contact</a>
                            </nav>
                        )
                    }



                    {/* User options */}
                    <div className="hidden md:flex items-center space-x-6">
                        <button className="hover:text-rose-500">
                            <Search size={20} />
                        </button>
                        <button className="hover:text-rose-500">
                            <User size={20} />
                        </button>
                        <button className="hover:text-rose-500">
                            <Heart size={20} />
                        </button>
                        <button className="flex items-center text-rose-600">
                            <ShoppingBag size={20} />
                            <span className="ml-2 bg-rose-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {
                mobileMenuOpen && (
                    <div className="md:hidden bg-gray-900 p-4">

                        {
                            location.pathname == '/' && (
                                <nav className="flex flex-col space-y-4">
                                    <a href="#hero" className="hover:text-rose-500">Home</a>
                                    <a href="#categories" className="hover:text-rose-500">Categories</a>
                                    <a href="#featured" className="hover:text-rose-500">Featured</a>
                                    <a href="#contact" className="hover:text-rose-500">Contact</a>
                                </nav>
                            )
                        }

                        <div className="flex justify-between mt-4 pt-4 border-t border-gray-700">
                            <button className="hover:text-rose-500"><Search size={20} /></button>
                            <button className="hover:text-rose-500"><User size={20} /></button>
                            <button className="hover:text-rose-500"><Heart size={20} /></button>
                            <button className="text-rose-600 flex items-center">
                                <ShoppingBag size={20} />
                                <span className="ml-1 bg-rose-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">3</span>
                            </button>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Navbar
