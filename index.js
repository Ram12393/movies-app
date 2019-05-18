const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config')
const user = require('./api/routes/auth.route');
const files = require('./api/routes/file-upload.route')
//Mongoose connection to Database

mongoose.connect(config.MONGO_URI).then(
    res => {
        console.log('MongoDB Successfully connected');
    }
).catch(res => {
    console.log(`MongoDB didn't connect, Please check the connection`);
});

//Body parser for to get the response in the body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))


app.use('/api/vi/auth', user);
app.use('/api/vi/',files);

const port = process.env.port || config.PORT;


//express listening port number
app.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})