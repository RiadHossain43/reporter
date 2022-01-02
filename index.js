require('dotenv').config()
const express = require('express')
const connectDb = require('./config/connectDb')
const app = express()
connectDb()
app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', require('./api/v1/endpoints/index'))
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Application started. Listing to port ${port}`)
})