const mongoose = require('mongoose')
const { MONGODB_SRV } = require('./config.json')

module.exports = async () => {
    await mongoose.connect(MONGODB_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}