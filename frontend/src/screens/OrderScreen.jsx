import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetOrderDetailsQuery, usePayOrderMutation, useDeliverOrderMutation } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();

    const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
    const { userInfo } = useSelector((state) => state.auth);

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();

    const payHandler = async () => {
        try {
            await payOrder({ orderId, details: { payer: {} } });
            refetch();
            toast.success('Order Paid');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const deliverHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success('Order Delivered');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return isLoading ? (
        <div>Loading...</div>
    ) : error ? (
        <div>{error?.data?.message || error.error}</div>
    ) : (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Order {order._id}</h1>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Shipping</h2>
                        <p><strong>Name: </strong> {order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? (
                            <div className="bg-green-100 text-green-800 p-2 rounded mt-2">Delivered on {order.deliveredAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-2 rounded mt-2">Pending</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <div className="bg-green-100 text-green-800 p-2 rounded mt-2">Paid on {order.paidAt}</div>
                        ) : (
                            <div className="bg-red-100 text-red-800 p-2 rounded mt-2">Not Paid</div>
                        )}
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <div>Order is empty</div>
                        ) : (
                            <div className="divide-y">
                                {order.orderItems.map((item, index) => (
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
                    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between mb-2">
                            <span>Items</span>
                            <span>₹{order.itemsPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>₹{order.shippingPrice}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax</span>
                            <span>₹{order.taxPrice}</span>
                        </div>
                        <hr className="my-2" />
                        <div className="flex justify-between mb-4 font-bold text-lg">
                            <span>Total</span>
                            <span>₹{order.totalPrice}</span>
                        </div>

                        {/* User Pay Button (Dev Mode) */}
                        {!userInfo?.isAdmin && !order.isPaid && (
                            <button
                                onClick={payHandler}
                                className="w-full bg-blinkit-yellow text-gray-900 font-bold py-3 rounded mb-2 hover:bg-yellow-500"
                            >
                                {loadingPay ? 'Processing Payment...' : 'Pay Now (Dev Mode)'}
                            </button>
                        )}

                        {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                            <button
                                onClick={deliverHandler}
                                className="w-full bg-blinkit-green text-white py-2 rounded mb-2 hover:bg-green-700"
                            >
                                {loadingDeliver ? 'Loading...' : 'Mark As Delivered'}
                            </button>
                        )}
                        {userInfo?.isAdmin && !order.isPaid && (
                            <button
                                onClick={payHandler}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                {loadingPay ? 'Loading...' : 'Mark As Paid'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
