const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config')
const user = require('./api/routes/auth.route');
const files = require('./api/routes/file-upload.route');
const city = require('./api/routes/city.route');
const area = require('./api/routes/area.route')
const theatre = require('./api/routes/theatre.route');
const feedback = require('./api/routes/feeback.route');
const actors = require('./api/routes/actors.route');
const crew = require('./api/routes/crew.route');

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
// app.use('/api/vi/',files);
// app.use('/api/vi/',city);
// app.use('/api/vi/',area);
app.use('/api/vi/', files, city, area, theatre, feedback, actors, crew);
// app.use('/api/vi/',feedback);

const port = process.env.port || config.PORT;


//express listening port number
app.listen(port, () => {
    console.log(`server is running on port number ${port}`)
})