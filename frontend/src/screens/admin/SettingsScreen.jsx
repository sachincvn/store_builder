import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';

const SettingsScreen = () => {
    const [appName, setAppName] = useState('');
    const [homeTitle, setHomeTitle] = useState('');
    const [themeColor, setThemeColor] = useState('');
    const [navColor, setNavColor] = useState('#ffffff');
    const [navTextColor, setNavTextColor] = useState('#000000');
    const [buttonColor, setButtonColor] = useState('#0c831f');
    const [footerColor, setFooterColor] = useState('#111827');
    const [footerTextColor, setFooterTextColor] = useState('#ffffff');
    const [bannerImage, setBannerImage] = useState('');
    const [promoCode, setPromoCode] = useState('');
    const [gradientType, setGradientType] = useState('default');
    const [coupons, setCoupons] = useState([]);
    const [newCouponCode, setNewCouponCode] = useState('');
    const [newCouponDiscount, setNewCouponDiscount] = useState('');
    const [newCouponMinAmount, setNewCouponMinAmount] = useState('');
    const [productCardStyle, setProductCardStyle] = useState('standard');
    const [gridColumns, setGridColumns] = useState(5);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchConfig();
    }, []);

    const fetchConfig = async () => {
        try {
            const { data } = await axios.get('/api/config');
            setAppName(data.appName);
            setHomeTitle(data.homeTitle);
            setThemeColor(data.themeColor);
            setNavColor(data.navColor || '#ffffff');
            setNavTextColor(data.navTextColor || '#000000');
            setButtonColor(data.buttonColor || '#0c831f');
            setFooterColor(data.footerColor || '#111827');
            setFooterTextColor(data.footerTextColor || '#ffffff');
            setBannerImage(data.bannerImage || '');
            setPromoCode(data.promoCode || '');
            setGradientType(data.gradientType || 'default');
            setCoupons(data.coupons || []);
            setProductCardStyle(data.productCardStyle || 'standard');
            setGridColumns(data.gridColumns || 5);
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
            await axios.put('/api/config', {
                appName,
                homeTitle,
                themeColor,
                navColor,
                navTextColor,
                buttonColor,
                footerColor,
                footerTextColor,
                bannerImage,
                promoCode,
                gradientType,
                coupons,
                productCardStyle,
                gridColumns
            }, config);
            toast.success('Settings updated');
            // Force reload to apply changes (simple way)
            setTimeout(() => window.location.reload(), 1000);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    };

    const addCouponHandler = () => {
        if (newCouponCode && newCouponDiscount) {
            setCoupons([...coupons, {
                code: newCouponCode.toUpperCase(),
                discount: Number(newCouponDiscount),
                minAmount: Number(newCouponMinAmount) || 0,
                isActive: true
            }]);
            setNewCouponCode('');
            setNewCouponDiscount('');
            setNewCouponMinAmount('');
        }
    };

    const removeCouponHandler = (code) => {
        setCoupons(coupons.filter(c => c.code !== code));
    };

    const resetHandler = async () => {
        if (window.confirm('Are you sure you want to reset all settings to default? This cannot be undone.')) {
            try {
                const config = {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                };
                await axios.post('/api/config/reset', {}, config);
                toast.success('Settings reset to default');
                setTimeout(() => window.location.reload(), 1000);
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-2xl font-bold mb-6">App Settings</h1>

            <div className="bg-white rounded-lg shadow-sm border p-6">
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">App Name</label>
                        <input
                            type="text"
                            value={appName}
                            onChange={(e) => setAppName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Home Page Title (Welcome Text)</label>
                        <input
                            type="text"
                            value={homeTitle}
                            onChange={(e) => setHomeTitle(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Theme Color (Hex)</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={themeColor}
                                    onChange={(e) => setThemeColor(e.target.value)}
                                    className="h-10 w-16 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={themeColor}
                                    onChange={(e) => setThemeColor(e.target.value)}
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Button Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={buttonColor}
                                    onChange={(e) => setButtonColor(e.target.value)}
                                    className="h-10 w-16 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={buttonColor}
                                    onChange={(e) => setButtonColor(e.target.value)}
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">App Bar Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={navColor}
                                    onChange={(e) => setNavColor(e.target.value)}
                                    className="h-10 w-16 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={navColor}
                                    onChange={(e) => setNavColor(e.target.value)}
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">App Bar Text Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={navTextColor}
                                    onChange={(e) => setNavTextColor(e.target.value)}
                                    className="h-10 w-16 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={navTextColor}
                                    onChange={(e) => setNavTextColor(e.target.value)}
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Footer Background</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={footerColor}
                                    onChange={(e) => setFooterColor(e.target.value)}
                                    className="h-10 w-16 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={footerColor}
                                    onChange={(e) => setFooterColor(e.target.value)}
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Footer Text Color</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="color"
                                    value={footerTextColor}
                                    onChange={(e) => setFooterTextColor(e.target.value)}
                                    className="h-10 w-16 border rounded cursor-pointer"
                                />
                                <input
                                    type="text"
                                    value={footerTextColor}
                                    onChange={(e) => setFooterTextColor(e.target.value)}
                                    className="shadow appearance-none border rounded flex-grow py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Banner Image URL</label>
                        <input
                            type="text"
                            value={bannerImage}
                            onChange={(e) => setBannerImage(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="https://example.com/banner.jpg"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Promo Code Text</label>
                        <input
                            type="text"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Use code BLINKIT50 for 50% off!"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Background Gradient Style</label>
                        <select
                            value={gradientType}
                            onChange={(e) => setGradientType(e.target.value)}
                            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="default">Default Green</option>
                            <option value="cool-blue">Cool Blue</option>
                            <option value="sunset">Sunset Orange</option>
                            <option value="diwali">Diwali Festival</option>
                            <option value="midnight">Midnight Dark</option>
                        </select>
                    </div>

                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Product Card Style</label>
                            <select
                                value={productCardStyle}
                                onChange={(e) => setProductCardStyle(e.target.value)}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="standard">Standard (Default)</option>
                                <option value="compact">Compact (Dense)</option>
                                <option value="detailed">Detailed (Big Image)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Grid Columns (Desktop)</label>
                            <select
                                value={gridColumns}
                                onChange={(e) => setGridColumns(Number(e.target.value))}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value={3}>3 Columns</option>
                                <option value={4}>4 Columns</option>
                                <option value={5}>5 Columns</option>
                                <option value={6}>6 Columns</option>
                            </select>
                        </div>
                    </div>

                    {/* Coupons Section */}
                    <div className="mb-8 border-t pt-6">
                        <h2 className="text-lg font-bold mb-4">Manage Coupons</h2>
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Code (e.g. SAVE10)"
                                value={newCouponCode}
                                onChange={(e) => setNewCouponCode(e.target.value)}
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <input
                                type="number"
                                placeholder="Discount %"
                                value={newCouponDiscount}
                                onChange={(e) => setNewCouponDiscount(e.target.value)}
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <input
                                type="number"
                                placeholder="Min Order Amount"
                                value={newCouponMinAmount}
                                onChange={(e) => setNewCouponMinAmount(e.target.value)}
                                className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="button"
                                onClick={addCouponHandler}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Add
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-2 max-h-40 overflow-y-auto">
                            {coupons.length === 0 && <p className="text-gray-500 text-sm text-center">No active coupons</p>}
                            {coupons.map((coupon, index) => (
                                <div key={index} className="flex justify-between items-center bg-white p-2 mb-2 rounded shadow-sm">
                                    <div>
                                        <span className="font-bold text-gray-800">{coupon.code}</span>
                                        <span className="text-gray-500 text-sm ml-2">-{coupon.discount}%</span>
                                        {coupon.minAmount > 0 && <span className="text-gray-400 text-xs ml-2">(Min: ₹{coupon.minAmount})</span>}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeCouponHandler(coupon.code)}
                                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            className="bg-blinkit-green hover:bg-green-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                        >
                            Save Changes
                        </button>

                        <button
                            type="button"
                            onClick={resetHandler}
                            className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset to Defaults
                        </button>

                    </div>
                </form>
            </div >
        </div >
    );
};

export default SettingsScreen;
