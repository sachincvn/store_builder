const Category = require('../models/Category');

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
    const { name, image } = req.body;

    const categoryExists = await Category.findOne({ name });

    if (categoryExists) {
        res.status(400).json({ message: 'Category already exists' });
        return;
    }

    const category = await Category.create({
        name,
        image,
    });

    if (category) {
        res.status(201).json(category);
    } else {
        res.status(400).json({ message: 'Invalid category data' });
    }
};

module.exports = {
    getCategories,
    createCategory,
};
