import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetOrderStatsQuery, useDeliverOrderMutation } from '../../slices/ordersApiSlice';
import { toast } from 'react-toastify';

const DashboardScreen = () => {
    const { data: stats, isLoading, error, refetch } = useGetOrderStatsQuery();
    const [deliverOrder] = useDeliverOrderMutation();

    useEffect(() => {
        refetch();
    }, []);

    const deliverHandler = async (id) => {
        if (window.confirm('Mark as Delivered?')) {
            try {
                await deliverOrder(id);
                refetch();
                toast.success('Order Delivered');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

            {isLoading ? (
                <div>Loading stats...</div>
            ) : error ? (
                <div className="text-red-500">{error?.data?.message || error.error}</div>
            ) : (
                <>
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blinkit-green">
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Total Sales</h3>
                            <p className="text-2xl font-bold mt-2">₹{stats.totalSales.toFixed(2)}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Total Orders</h3>
                            <p className="text-2xl font-bold mt-2">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Pending Orders</h3>
                            <p className="text-2xl font-bold mt-2 text-yellow-600">{stats.pendingOrders}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                            <h3 className="text-gray-500 text-sm font-bold uppercase">Completed</h3>
                            <p className="text-2xl font-bold mt-2 text-green-600">{stats.completedOrders}</p>
                        </div>
                    </div>

                    {/* Recent Pending Orders */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Recent Pending Orders</h2>
                            <Link to="/admin/orderlist" className="text-blinkit-green font-bold text-sm hover:underline">View All Orders</Link>
                        </div>

                        {stats.recentPending.length === 0 ? (
                            <p className="text-gray-500">No pending orders. Great job!</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {stats.recentPending.map((order) => (
                                            <tr key={order._id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user ? order.user.name : 'Unknown'}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{order.totalPrice}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <Link to={`/order/${order._id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                                                    <button
                                                        onClick={() => deliverHandler(order._id)}
                                                        className="text-green-600 hover:text-green-900 font-bold"
                                                    >
                                                        Mark Done
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DashboardScreen;
