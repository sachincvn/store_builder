import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Product from '../components/Product';

const CategoryScreen = () => {
    const { keyword } = useParams(); // Using keyword as category name for simplicity or exact match
    const { data: products, isLoading, error } = useGetProductsQuery({});

    // Filter products by category
    const categoryProducts = products?.filter(
        (p) => p.category.toLowerCase() === keyword.toLowerCase()
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <Link to="/" className="text-gray-600 hover:text-blinkit-green mb-6 inline-block">
                &larr; Back to Home
            </Link>

            <h1 className="text-2xl font-bold mb-6 capitalize">{keyword}</h1>

            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error?.data?.message || error.error}</div>
            ) : categoryProducts?.length === 0 ? (
                <div>No products found in this category</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {categoryProducts.map((product) => (
                        <div key={product._id}>
                            <Product product={product} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryScreen;
