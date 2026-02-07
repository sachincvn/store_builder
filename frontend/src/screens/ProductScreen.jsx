import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { settings } = useSelector((state) => state.config);
    const buttonColor = settings?.buttonColor || '#0c831f';

    const [qty, setQty] = useState(1);

    const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="text-sm breadcrumbs text-gray-500 mb-6">
                <Link to="/" className="hover:text-blinkit-green">Home</Link> / <span className="text-gray-700">{product?.category}</span> / {product?.name}
            </div>

            {isLoading ? (
                <div className="flex justify-center py-20">Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error?.data?.message || error.error}</div>
            ) : (
                <div className="flex flex-col md:flex-row gap-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                    {/* Image Section */}
                    <div className="md:w-1/2 flex justify-center items-center bg-gray-50 rounded-xl p-8">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-96 w-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 flex flex-col justify-center">
                        <div className="mb-2">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{product.brand}</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-green-100 px-2 py-1 rounded text-xs font-bold flex items-center" style={{ color: buttonColor, backgroundColor: `${buttonColor}20` }}>
                                {product.rating} ★
                            </div>
                            <span className="text-gray-400 text-sm">{product.numReviews} ratings</span>
                        </div>

                        <hr className="border-gray-100 mb-6" />

                        <div className="mb-6">
                            <div className="flex items-end gap-3 mb-2">
                                <span className="text-4xl font-bold text-gray-900">₹{product.price}</span>
                                <span className="text-lg text-gray-400 line-through mb-1">₹{Math.round(product.price * 1.2)}</span>
                                <span className="font-bold mb-1 text-sm" style={{ color: buttonColor }}>20% OFF</span>
                            </div>
                            <p className="text-sm font-medium" style={{ color: buttonColor }}>Inclusive of all taxes</p>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            {product.countInStock > 0 && (
                                <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: buttonColor }}>
                                    <button
                                        className="px-4 py-2 font-bold transition-colors"
                                        style={{ color: buttonColor, backgroundColor: `${buttonColor}10` }}
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                    >-</button>
                                    <span className="px-4 font-semibold text-gray-700">{qty}</span>
                                    <button
                                        className="px-4 py-2 font-bold transition-colors"
                                        style={{ color: buttonColor, backgroundColor: `${buttonColor}10` }}
                                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                                    >+</button>
                                </div>
                            )}
                        </div>

                        <button
                            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl transform active:scale-99 uppercase tracking-wide text-lg ${product.countInStock > 0
                                ? ''
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                            style={product.countInStock > 0 ? { backgroundColor: buttonColor } : {}}
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                        >
                            {product.countInStock > 0 ? 'Add to Cart' : 'Out Of Stock'}
                        </button>

                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-2">Product Description</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {product.description}
                            </p>
                        </div>

                        <div className="mt-6 flex gap-4 text-xs text-gray-500">
                            <div className="bg-gray-50 px-3 py-2 rounded-lg flex flex-col items-center gap-1">
                                <span>🚚</span>
                                <span>10 min Delivery</span>
                            </div>
                            <div className="bg-gray-50 px-3 py-2 rounded-lg flex flex-col items-center gap-1">
                                <span>🛡️</span>
                                <span>Safe & Hygienic</span>
                            </div>
                            <div className="bg-gray-50 px-3 py-2 rounded-lg flex flex-col items-center gap-1">
                                <span>↩️</span>
                                <span>Easy Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductScreen;
