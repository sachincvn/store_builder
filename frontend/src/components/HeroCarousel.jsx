import React, { useState, useEffect } from 'react';

const HeroCarousel = () => {
    const banners = [
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg",
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=2700/layout-engine/2022-05/Group-33704.jpg"
        // Using same image for demo or find another valid one. 
        // Let's use some generic food banners from Unsplash for variety if specific blinkit ones aren't available.
    ];

    // Better images for demo
    const images = [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80", // Grocery
        "https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1200&q=80", // Fresh
        "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&w=1200&q=80"  // Market
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-48 md:h-64 lg:h-80 overflow-hidden rounded-xl mb-8 shadow-md">
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <img
                        src={img}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-white text-3xl md:text-5xl font-bold drop-shadow-lg p-4 text-center">
                            {index === 0 ? "Fresh Groceries Delivered in 10 Minutes" :
                                index === 1 ? "Farm Fresh Vegetables & Fruits" :
                                    "Best Deals on Daily Essentials"}
                        </h2>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-400'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;
