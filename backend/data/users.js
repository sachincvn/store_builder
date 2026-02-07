const bcrypt = require('bcrypt');

const users = [
    {
        name: 'Sachin Chavan',
        email: 'sachincvnn962@gmail.com',
        password: 'password123',
        phone: '9999999999',
        isAdmin: true,
    },
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        phone: '9999999999',
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: '8888888888',
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password123',
        phone: '7777777777',
        isAdmin: false,
    },
];

module.exports = users;
