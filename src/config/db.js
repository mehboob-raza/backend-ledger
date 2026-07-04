const mongoose = require('mongoose')

function connectToDB() {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Server connected to DB');
        })
        .catch(err => {
            console.error('Error Connecting to DB:', err);
            process.exit(1);
        });
}


module.exports = connectToDB