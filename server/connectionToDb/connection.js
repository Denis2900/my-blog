const mongoose = require('mongoose')
const db = 'mongodb+srv://User:12345qwert@cluster0.4osk6.mongodb.net/?retryWrites=true&w=majority'
const connectToDb = mongoose.connect(db).then(()=>{console.log('Подключение к базе данных')})
module.exports = connectToDb 
