const mongoose = require('mongoose')
const dbConfig = require('./dbconfig')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(dbConfig.database, {
            useNewUrlParser: true,
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = connectDB