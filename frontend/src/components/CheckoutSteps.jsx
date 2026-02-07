import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-4">
                {step1 ? (
                    <Link to="/login" className="text-blinkit-green font-bold">Sign In</Link>
                ) : (
                    <span className="text-gray-400">Sign In</span>
                )}
                <span>&gt;</span>
                {step2 ? (
                    <Link to="/shipping" className="text-blinkit-green font-bold">Shipping</Link>
                ) : (
                    <span className="text-gray-400">Shipping</span>
                )}
                <span>&gt;</span>
                {step3 ? (
                    <Link to="/payment" className="text-blinkit-green font-bold">Payment</Link>
                ) : (
                    <span className="text-gray-400">Payment</span>
                )}
                <span>&gt;</span>
                {step4 ? (
                    <Link to="/placeorder" className="text-blinkit-green font-bold">Place Order</Link>
                ) : (
                    <span className="text-gray-400">Place Order</span>
                )}
            </div>
        </div>
    );
};

export default CheckoutSteps;
