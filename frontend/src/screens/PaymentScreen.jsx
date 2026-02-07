import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    useEffect(() => {
        if (!shippingAddress) {
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <div className="container mx-auto px-4 py-8 flex justify-center">
            <div className="w-full max-w-lg">
                <CheckoutSteps step1 step2 step3 />
                <h1 className="text-2xl font-bold mb-6">Payment Method</h1>
                <form onSubmit={submitHandler}>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Select Method</label>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blinkit-green"
                                    id="PayPal"
                                    name="paymentMethod"
                                    value="PayPal"
                                    checked={paymentMethod === 'PayPal'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="ml-2 text-gray-700" htmlFor="PayPal">PayPal or Credit Card</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    className="form-radio h-5 w-5 text-blinkit-green"
                                    id="COD"
                                    name="paymentMethod"
                                    value="COD"
                                    checked={paymentMethod === 'COD'}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <label className="ml-2 text-gray-700" htmlFor="COD">Cash on Delivery</label>
                            </div>
                        </div>
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

export default PaymentScreen;
