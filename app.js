const express = require('express');
const path = require('path');
const app = express();
// const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 3000;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    email: String,
    phone: String,
    address: String
});
const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For saving static file
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine for pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req,res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req,res)=>{
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req,res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("This item has saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not savde to the database")
    });
    
    // res.status(200).render('contact.pug');
});

// STSRT THE SERVER
app.listen(port, ()=>{
    console.log(`This app started sucessfully on port ${port}`);
});