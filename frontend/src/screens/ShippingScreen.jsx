import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-lg">
                <CheckoutSteps step1 step2 />
                <h1 className="text-2xl font-bold mb-6">Shipping</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address</label>
                        <input
                            type="text"
                            placeholder="Enter address"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blinkit-green"
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">City</label>
                        <input
                            type="text"
                            placeholder="Enter city"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blinkit-green"
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Postal Code</label>
                        <input
                            type="text"
                            placeholder="Enter postal code"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blinkit-green"
                            value={postalCode}
                            required
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                        <input
                            type="text"
                            placeholder="Enter country"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blinkit-green"
                            value={country}
                            required
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blinkit-green text-white py-3 rounded-lg font-bold hover:bg-green-700"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;
