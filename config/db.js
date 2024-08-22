const mongoose = require('mongoose');

const local = "mongodb+srv://ngocminhnguyen241:myapp241@mydatabase.wnbmi.mongodb.net/Database";

const connect = async () => {
    try {
        await mongoose.connect(local);
        console.log('Connect success');
    } catch (error) {
        console.error('Connection to MongoDB failed:', error);
    }
}

module.exports = { connect };
