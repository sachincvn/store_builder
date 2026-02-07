const Config = require('../models/Config');

// @desc    Get system config
// @route   GET /api/config
// @access  Public
const getConfig = async (req, res) => {
    const config = await Config.findOne();
    if (config) {
        res.json(config);
    } else {
        // Return defaults if no config exists
        res.json({ appName: 'Blinkit Clone', themeColor: '#0c831f' });
    }
};

// @desc    Update system config
// @route   PUT /api/config
// @access  Private/Admin
const updateConfig = async (req, res) => {
    const { 
        appName, homeTitle, themeColor, navColor, bannerImage, promoCode, gradientType,
        navTextColor, buttonColor, footerColor, footerTextColor, coupons,
        productCardStyle, gridColumns
    } = req.body;

    let config = await Config.findOne();

    if (config) {
        config.appName = appName || config.appName;
        config.homeTitle = homeTitle || config.homeTitle;
        config.themeColor = themeColor || config.themeColor;
        config.navColor = navColor || config.navColor;
        config.bannerImage = bannerImage || config.bannerImage;
        config.promoCode = promoCode || config.promoCode;
        config.gradientType = gradientType || config.gradientType;
        config.navTextColor = navTextColor || config.navTextColor;
        config.buttonColor = buttonColor || config.buttonColor;
        config.footerColor = footerColor || config.footerColor;
        config.footerTextColor = footerTextColor || config.footerTextColor;
        if (coupons) config.coupons = coupons;

        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } else {
        config = await Config.create({
            appName,
            homeTitle,
            themeColor,
            navColor,
            bannerImage,
            promoCode,
            gradientType,
            navTextColor,
            buttonColor,
            footerColor,
            footerTextColor
        });
        res.json(config);
    }
};

// @desc    Reset system config to defaults
// @route   POST /api/config/reset
// @access  Private/Admin
const resetConfig = async (req, res) => {
    await Config.deleteMany({});
    const config = await Config.create({
        appName: 'Blinkit Clone',
        homeTitle: 'Welcome to Blinkit',
        themeColor: '#0c831f',
        navColor: '#ffffff',
        navTextColor: '#000000',
        buttonColor: '#0c831f',
        footerColor: '#111827',
        footerTextColor: '#ffffff',
        bannerImage: '',
        promoCode: '',
        gradientType: 'default',
        coupons: [],
        productCardStyle: 'standard',
        gridColumns: 5,
    });
    res.json(config);
};

module.exports = {
    getConfig,
    updateConfig,
    resetConfig,
};
