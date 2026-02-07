import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation, useGetProfileQuery } from '../slices/usersApiSlice';
import { logout, setCredentials } from '../slices/authSlice';
import axios from 'axios';

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const { settings } = useSelector((state) => state.config); // Global Config
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [logoutApiCall] = useLogoutMutation();

    // Removed local fetchConfig, using global state
    const appName = settings?.appName || 'Blinkit';
    const navColor = settings?.navColor || '#ffffff';
    const navTextColor = settings?.navTextColor || '#000000'; // Default black

    // Auto-sync user profile (upgrades to Admin without re-login)
    const { data: profile } = useGetProfileQuery(undefined, {
        skip: !userInfo,
        refetchOnMountOrArgChange: true,
    });

    React.useEffect(() => {
        if (profile && userInfo) {
            // If admin status changed or name changed, update local storage
            if (profile.isAdmin !== userInfo.isAdmin || profile.name !== userInfo.name) {
                const updatedUser = { ...userInfo, ...profile };
                dispatch(setCredentials(updatedUser));
            }
        }
    }, [profile, userInfo, dispatch]);

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 transition-all duration-300" style={{ backgroundColor: `${navColor}dd` }}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo Section */}
                <Link to="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-bold tracking-tight transition-colors duration-300" style={{ color: navTextColor, fontFamily: '"Inter", sans-serif' }}>
                        {appName}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-green-500 mb-1 animate-pulse"></span>
                </Link>

                {/* Actions Section */}
                <nav className="flex items-center gap-6">
                    {/* Admin Links (Desktop) */}
                    {userInfo && userInfo.isAdmin && (
                        <div className="hidden lg:flex items-center gap-4 mr-4">
                            <Link to="/admin/dashboard" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: navTextColor }}>Dashboard</Link>
                            <Link to="/admin/productlist" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: navTextColor }}>Products</Link>
                            <Link to="/admin/orderlist" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: navTextColor }}>Orders</Link>
                            <Link to="/admin/settings" className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: navTextColor }}>Settings</Link>
                        </div>
                    )}

                    {/* Cart Icon */}
                    <Link to="/cart" className="relative group p-2 rounded-full hover:bg-gray-100/50 transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke={navTextColor} strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-sm border-2 border-white">
                                {cartItems.reduce((a, c) => a + c.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {/* User Profile / Login */}
                    {userInfo ? (
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2 font-medium text-sm focus:outline-none hover:opacity-70 transition-opacity"
                                style={{ color: navTextColor }}
                            >
                                <span>{userInfo.name.split(' ')[0]}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 border border-gray-100 z-50 animate-fade-in-down">
                                    <div className="px-4 py-2 border-b border-gray-50">
                                        <p className="text-xs text-gray-500">Signed in as</p>
                                        <p className="text-sm font-bold truncate">{userInfo.email}</p>
                                    </div>

                                    <Link
                                        to="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-blinkit-green"
                                        onClick={() => setDropdownOpen(false)}
                                    >
                                        My Orders
                                    </Link>

                                    {userInfo.isAdmin && (
                                        <>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <p className="px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Admin</p>
                                            <Link
                                                to="/admin/productlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-blinkit-green"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Manage Products
                                            </Link>
                                            <Link
                                                to="/admin/orderlist"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-blinkit-green"
                                                onClick={() => setDropdownOpen(false)}
                                            >
                                                Manage Orders
                                            </Link>
                                        </>
                                    )}

                                    <div className="border-t border-gray-100 my-1"></div>
                                    <button
                                        onClick={logoutHandler}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login" className="text-gray-700 hover:text-blinkit-green font-medium">
                            Login
                        </Link>
                    )}


                </nav>
            </div>
        </header >
    );
};

export default Header;
