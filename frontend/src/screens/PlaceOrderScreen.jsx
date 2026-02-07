import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping');
        } else if (!cart.paymentMethod) {
            navigate('/payment');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();

            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Shipping</h2>
                        <p className="text-gray-700">
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <p className="text-gray-700">
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <div>Your cart is empty</div>
                        ) : (
                            <div className="divide-y">
                                {cart.cartItems.map((item, index) => (
                                    <div key={index} className="py-2 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-12 h-12 object-contain" />
                                            <Link to={`/product/${item._id}`} className="text-gray-800 font-medium hover:text-blinkit-green">{item.name}</Link>
                                        </div>
                                        <div className="text-gray-600">
                                            {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="md:w-1/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>₹{cart.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>₹{cart.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>₹{cart.taxPrice}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-4 font-bold text-lg">
                            <span>Total</span>
                            <span>₹{cart.totalPrice}</span>
                        </div>

                        {error && <div className="text-red-500 mb-4 text-sm">{error?.data?.message || error.error}</div>}

                        <button
                            type="button"
                            className="w-full bg-blinkit-green text-white py-3 rounded-lg font-bold hover:bg-green-700 uppercase"
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}
                        >
                            {isLoading ? 'Placing Order...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
