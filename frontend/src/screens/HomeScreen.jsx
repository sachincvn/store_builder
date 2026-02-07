import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';
import HeroCarousel from '../components/HeroCarousel';
import CategoryCarousel from '../components/CategoryCarousel';
import axios from 'axios';

const HomeScreen = () => {
    const { keyword } = useParams();
    const { data: products, isLoading, error } = useGetProductsQuery({ keyword });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            // ... existing fetch categories logic
            try {
                const { data } = await axios.get('/api/categories');
                setCategories(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    // Use backend filtering (already implemented in controller)
    const groupedProducts = products ? products.reduce((acc, product) => {
        (acc[product.category] = acc[product.category] || []).push(product);
        return acc;
    }, {}) : {};


    // Use Global Config
    const { settings: config } = useSelector((state) => state.config);

    useEffect(() => {
        if (config?.appName) {
            document.title = config.appName;
        }
    }, [config]);

    const getGradient = (type, color) => {
        switch (type) {
            case 'cool-blue':
                return { background: 'linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%)' };
            case 'sunset':
                return { background: 'linear-gradient(135deg, #ffedd5 0%, #fff7ed 100%)' };
            case 'diwali':
                return { background: 'linear-gradient(135deg, #fef9c3 0%, #fef3c7 100%)' };
            case 'midnight':
                return { background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white' };
            default:
                return { background: `linear-gradient(to bottom, ${color}15, #f9fafb)` };
        }
    };

    const pageStyle = getGradient(config?.gradientType || 'default', config?.themeColor || '#0c831f');

    return (
        <div className="container mx-auto px-4 py-6 min-h-screen pb-20" style={pageStyle}>


            {config.bannerImage && (
                <div className="mt-6 mb-8 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <img
                        src={config.bannerImage}
                        alt="Banner"
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                        <h2 className="text-white text-2xl font-bold">{config.homeTitle}</h2>
                        <p className="text-white/90 text-sm">Shop the best deals today</p>
                    </div>
                </div>
            )}

            {config?.promoCode && (
                <div className="inline-block bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 rounded shadow-sm">
                    <p className="font-bold">{config.promoCode}</p>
                </div>
            )}


            {!keyword && <HeroCarousel />}
            {!keyword && categories.length > 0 && <CategoryCarousel categories={categories} />}

            {
                keyword && (
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Search Results for "{keyword}"</h2>
                        <Link to="/" className="hover:underline" style={{ color: config?.themeColor }}>Clear Search</Link>
                    </div>
                )
            }

            {
                isLoading ? (
                    <div className="flex justify-center py-20">Loading products...</div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error?.data?.message || error.error}</div>
                ) : (
                    <div className="space-y-12">
                        {Object.keys(groupedProducts).map((category) => (
                            <div key={category} className="mb-4">
                                <div className="flex justify-between items-end mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                                        <p className="text-xs text-gray-500">{groupedProducts[category].length} items</p>
                                    </div>
                                    <Link to={`/category/${category}`} className="font-bold text-sm hover:underline" style={{ color: config?.themeColor }}>see all</Link>
                                </div>
                                <div
                                    className="grid gap-4"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `repeat(auto-fill, minmax(${config?.gridColumns > 4 ? '180px' : '220px'}, 1fr))`
                                    }}
                                >
                                    {groupedProducts[category].map((product) => (
                                        <div key={product._id}>
                                            <Product product={product} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )
            }
        </div >
    );
};

export default HomeScreen;
