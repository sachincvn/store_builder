const mongoose = require('mongoose');

const configSchema = mongoose.Schema(
    {
        appName: {
            type: String,
            default: 'Blinkit Clone',
        },
        homeTitle: {
            type: String,
            default: 'Welcome to Blinkit',
        },
        themeColor: {
            type: String,
            default: '#0c831f', // Default blinkit green
        },
        navColor: {
            type: String,
            default: '#ffffff', // Default white
        },
        bannerImage: {
            type: String, // URL to banner image
            default: '',
        },
        promoCode: {
            type: String,
            default: '',
        },
        gradientType: {
            type: String,
            default: 'default', // default, cool-blue, sunset, diwali
        },
        navTextColor: {
            type: String,
            default: '#000000',
        },
        buttonColor: {
            type: String,
            default: '#0c831f', // Default blinkit green
        },
        footerColor: {
            type: String,
            default: '#111827', // Default gray-900
        },
        footerTextColor: {
            type: String,
            default: '#ffffff',
        },
        coupons: [{
            code: { type: String, required: true },
            discount: { type: Number, required: true }, // Percentage
            minAmount: { type: Number, default: 0 },
            isActive: { type: Boolean, default: true }
        }],
    },
    {
        timestamps: true,
    }
);

const Config = mongoose.model('Config', configSchema);

module.exports = Config;
