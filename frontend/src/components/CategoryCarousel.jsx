import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCarousel = ({ categories }) => {
    // For a simple standard view without carousel library, we use a horizontal scroll container
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 px-2">Shop by Category</h2>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar px-2">
                {categories.map((category) => (
                    <Link
                        to={`/category/${category.name}`}
                        key={category._id}
                        className="flex-shrink-0 w-24 md:w-32 flex flex-col items-center group cursor-pointer"
                    >
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-xl flex items-center justify-center mb-2 overflow-hidden shadow-sm group-hover:shadow-md transition-all border border-transparent group-hover:border-blinkit-green">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=No+Image" }}
                            />
                        </div>
                        <span className="text-xs md:text-sm text-center font-medium text-gray-700 leading-tight group-hover:text-blinkit-green">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
