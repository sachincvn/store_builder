import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const CategoryListScreen = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [categories, setCategories] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);

    // Fetch categories on load
    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await axios.get('/api/categories');
            setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.post('/api/categories', { name, image }, config);
            toast.success('Category created');
            setName('');
            setImage('');
            fetchCategories();
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

            <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">Create New Category</h2>
                <form onSubmit={submitHandler} className="flex flex-col md:flex-row gap-4 align-end">
                    <div className="flex-grow">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Dairy, Snacks"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex-grow">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                        <input
                            type="text"
                            placeholder="Image URL"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="bg-blinkit-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>

            <h2 className="text-xl font-bold mb-4">Existing Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categories.map((category) => (
                    <div key={category._id} className="bg-white border rounded-lg p-4 flex flex-col items-center shadow-sm">
                        <img
                            src={category.image}
                            alt={category.name}
                            className="w-16 h-16 object-contain mb-2"
                            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100?text=No+Image" }}
                        />
                        <span className="font-bold text-gray-800 text-center">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryListScreen;
