const express = require('express');

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');


const collegeName = "NIT Agartala";
const eventName = "Backend Development @101";
const totalSeats = 50;
let remainingSeats = 50;
const userData = [];


const validateSeats = async (req, res, next) => {
    const requestedSeats = req.body.seats;
    if (requestedSeats > remainingSeats || requestedSeats < 1) {
        console.log('The requested seats count is not valid.');
        res.status(400).json("The requested seats count is not valid.");
    } else {
        next();
    }
}


app.get('/', (req, res) => {
    res.render('main', {collegeName, eventName, totalSeats, remainingSeats});
})

app.get('/list', (req, res) => {
    res.render('listUsers', { userData })
})

app.post('/create', validateSeats, (req, res) => {
    const userName = req.body.username;
    const requestedSeats = req.body.seats;

    userData.push({userName, requestedSeats});

    remainingSeats -= requestedSeats;

    res.render('ticket', {
        userName: userName,
        ticketCount: requestedSeats
    });
});

app.listen(3000, () => {
    console.log('Server started..');
})

// 1. npm i mongoose
// create models 
// const mongoose = require('mongoose')
// create userschema
// connect with the db
// mongoose.connect()
    