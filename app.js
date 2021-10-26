const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const { MONGOURI } = require('./config/keys');

//mongodb connection
mongoose.connect(MONGOURI);
mongoose.connection.on('connected', () => {
    console.log('MongoDB connected....');
})
mongoose.connection.on('error', (err) => {
    console.log('MongoDB error', err);
})

//models
require('./models/user');
require('./models/post');

//Built-in middleware
app.use(express.json());

//routes
app.use(require('./routes/auth'));
app.use(require('./routes/post'));
app.use(require('./routes/user'));


if(process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


//port listening
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
})