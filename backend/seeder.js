const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');

const products = require('./data/products');
const categories = require('./data/categories');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const createdCategories = await Category.insertMany(categories);

        const sampleProducts = products.map((product) => {
            // Find category ID by name
            const category = createdCategories.find(c => c.name === product.category);
            return { 
                ...product, 
                user: adminUser,
                category: category ? category.name : 'Unknown Category' // Storing name or ID depending on schema
            };
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        await Category.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
