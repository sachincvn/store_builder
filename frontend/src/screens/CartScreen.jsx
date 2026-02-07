import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    // Coupon Logic
    const { settings } = useSelector((state) => state.config);
    const [couponCode, setCouponCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState('');

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

    const applyCouponHandler = () => {
        const coupon = settings.coupons?.find(c => c.code === couponCode.toUpperCase() && c.isActive);
        if (coupon) {
            if (coupon.minAmount && itemsPrice < coupon.minAmount) {
                setDiscount(0);
                setCouponError(`Minimum order amount is ₹${coupon.minAmount}`);
            } else {
                setDiscount(coupon.discount);
                setCouponError('');
            }
        } else {
            setDiscount(0);
            setCouponError('Invalid Coupon Code');
        }
    };
    const discountAmount = (itemsPrice * discount) / 100;
    const finalPrice = itemsPrice - discountAmount;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <div className="bg-white p-6 rounded-lg text-center">
                    Your cart is empty <Link to="/" className="text-blinkit-green hover:underline">Go Back</Link>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-2/3">
                        {cartItems.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded-lg shadow-sm border mb-4 flex items-center justify-between">
                                <Link to={`/product/${item._id}`} className="flex items-center space-x-4">
                                    <img src={item.image} alt={item.name} className="h-16 w-16 object-contain" />
                                    <span className="font-semibold">{item.name}</span>
                                </Link>
                                <div className="flex items-center space-x-4">
                                    <span className="font-bold">₹{item.price}</span>
                                    <select
                                        className="border rounded p-1"
                                        value={item.qty}
                                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        className="text-red-500 hover:text-red-700"
                                        onClick={() => removeFromCartHandler(item._id)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="md:w-1/3">
                        <div className="bg-white p-6 rounded-lg shadow-sm border">
                            <h2 className="text-lg font-bold mb-4">
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>

                            {/* Coupon Input */}
                            <div className="mb-4">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter Coupon Code"
                                        className="border rounded px-3 py-2 w-full text-sm"
                                    />
                                    <button
                                        onClick={applyCouponHandler}
                                        className="bg-gray-800 text-white px-3 py-2 rounded text-sm font-bold"
                                        style={{ backgroundColor: settings?.buttonColor }}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                                {discount > 0 && <p className="text-green-600 text-xs mt-1 font-bold">Coupon Applied: {discount}% Off</p>}
                            </div>

                            <div className="space-y-2 mb-6 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{itemsPrice.toFixed(2)}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-green-600 font-bold">
                                        <span>Discount</span>
                                        <span>-₹{discountAmount.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-xl font-bold border-t pt-2">
                                    <span>Total</span>
                                    <span>₹{finalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-blinkit-green text-white py-3 rounded-lg font-bold hover:opacity-90 uppercase transition-opacity"
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                                style={{ backgroundColor: settings?.buttonColor }}
                            >
                                Proceed To Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
