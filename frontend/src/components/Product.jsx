import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);
    const { settings } = useSelector((state) => state.config); // Get settings
    const buttonColor = settings?.buttonColor || '#0c831f';
    const cardStyle = settings?.productCardStyle || 'standard';

    // Check if item is in cart to show proper quantity state
    const cartItem = cartItems.find((item) => item._id === product._id);
    const [qty, setQty] = useState(cartItem ? cartItem.qty : 0);

    useEffect(() => {
        if (cartItem) {
            setQty(cartItem.qty);
        } else {
            setQty(0);
        }
    }, [cartItem]);



    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty: 1 }));
        setQty(1);
    };

    const increaseQty = () => {
        dispatch(addToCart({ ...product, qty: qty + 1 }));
        setQty(qty + 1);
    };

    const decreaseQty = () => {
        if (qty > 1) {
            dispatch(addToCart({ ...product, qty: qty - 1 }));
            setQty(qty - 1);
        } else {
            dispatch(removeFromCart(product._id));
            setQty(0);
        }
    };

    // --- RENDER VARIANTS ---

    // 1. COMPACT VARIANT (Minimalist, dense)
    if (cardStyle === 'compact') {
        return (
            <div className="bg-white rounded-lg border border-gray-100 p-2 hover:shadow-md transition-shadow h-full flex flex-col relative group">
                {product.countInStock === 0 && (
                    <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">OUT OF STOCK</div>
                )}
                <Link to={`/product/${product._id}`} className="flex items-center gap-3 mb-2">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-contain" />
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-0.5 truncate">{product.brand}</div>
                        <h3 className="font-semibold text-gray-800 text-sm leading-tight truncate">{product.name}</h3>
                        <div className="font-bold text-gray-900 mt-1">₹{product.price}</div>
                    </div>
                </Link>
                <div className="mt-auto">
                    {product.countInStock === 0 ? (
                        <button disabled className="w-full py-1.5 bg-gray-100 text-gray-400 text-xs font-bold rounded cursor-not-allowed">Sold Out</button>
                    ) : qty === 0 ? (
                        <button onClick={addToCartHandler} className="w-full py-1.5 text-white text-xs font-bold rounded shadow-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: buttonColor }}>ADD</button>
                    ) : (
                        <div className="flex items-center justify-between bg-green-50 rounded px-1 py-0.5" style={{ borderColor: buttonColor, borderWidth: '1px' }}>
                            <button onClick={decreaseQty} className="w-6 text-center font-bold text-sm" style={{ color: buttonColor }}>-</button>
                            <span className="text-xs font-bold" style={{ color: buttonColor }}>{qty}</span>
                            <button onClick={increaseQty} className="w-6 text-center font-bold text-sm" style={{ color: buttonColor }}>+</button>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // 2. DETAILED VARIANT (Larger image, more info)
    if (cardStyle === 'detailed') {
        return (
            <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col border border-gray-100 overflow-hidden relative">
                {product.countInStock === 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">OUT OF STOCK</div>
                )}
                <Link to={`/product/${product._id}`} className="block h-48 w-full bg-gray-50 p-4 relative group">
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                    <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">{product.brand || 'Premium'}</div>
                    <Link to={`/product/${product._id}`} className="hover:text-green-600 transition-colors">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight line-clamp-2">{product.name}</h3>
                    </Link>
                    <div className="flex items-center mb-3">
                        <div className="bg-green-100 text-green-800 text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">
                            {product.rating} ★
                        </div>
                        <span className="text-gray-400 text-xs ml-2">({product.numReviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                        <div className="text-xl font-extrabold text-gray-900">₹{product.price}</div>
                        {product.countInStock === 0 ? (
                            <button disabled className="px-4 py-2 bg-gray-200 text-gray-500 font-bold rounded-lg cursor-not-allowed">Sold Out</button>
                        ) : qty === 0 ? (
                            <button onClick={addToCartHandler} className="px-6 py-2 text-white font-bold rounded-lg shadow-md hover:-translate-y-0.5 transition-all text-sm" style={{ backgroundColor: buttonColor }}>ADD TO CART</button>
                        ) : (
                            <div className="flex items-center bg-white border rounded-lg shadow-sm" style={{ borderColor: buttonColor }}>
                                <button onClick={decreaseQty} className="px-3 py-2 font-bold hover:bg-gray-50 rounded-l-lg transition-colors" style={{ color: buttonColor }}>-</button>
                                <span className="px-2 font-bold min-w-[20px] text-center">{qty}</span>
                                <button onClick={increaseQty} className="px-3 py-2 font-bold hover:bg-gray-50 rounded-r-lg transition-colors" style={{ color: buttonColor }}>+</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // 3. STANDARD VARIANT (Default)
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col relative overflow-hidden group">
            {product.countInStock === 0 && (
                <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
                    <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">OUT OF STOCK</div>
                </div>
            )}

            <Link to={`/product/${product._id}`} className="relative block h-40 p-4 bg-white">
                <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
            </Link>

            <div className="p-3 flex flex-col flex-grow bg-white">
                <div className="flex items-center mb-1">
                    <div className="bg-gray-100 text-gray-500 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        {product.brand || 'Generic'}
                    </div>
                </div>

                <Link to={`/product/${product._id}`}>
                    <h3 className="font-semibold text-gray-800 text-sm mb-1 leading-snug line-clamp-2 min-h-[40px]" style={{ color: settings?.navTextColor }}>
                        {product.name}
                    </h3>
                </Link>

                <div className="mt-auto flex justify-between items-center pt-2">
                    <div className="text-gray-900 font-bold text-sm">₹{product.price}</div>

                    {qty === 0 ? (
                        <button
                            className="text-white text-xs font-bold px-4 py-1.5 rounded shadow-sm hover:opacity-90 transition-opacity uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                            style={{ backgroundColor: buttonColor }}
                        >
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center rounded border overflow-hidden" style={{ borderColor: buttonColor }}>
                            <button
                                className="px-2 py-1 hover:bg-gray-50 transition-colors font-bold text-sm"
                                onClick={decreaseQty}
                                style={{ color: buttonColor }}
                            >
                                -
                            </button>
                            <span className="px-2 text-xs font-bold text-gray-700 min-w-[20px] text-center">{qty}</span>
                            <button
                                className="px-2 py-1 hover:bg-gray-50 transition-colors font-bold text-sm"
                                onClick={increaseQty}
                                style={{ color: buttonColor }}
                            >
                                +
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;

