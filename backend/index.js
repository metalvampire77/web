const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const UserModel = require('./models/user')

const app = express();
app.use(express.json()); 
app.use(cors());

mongoose.connect('mongodb+srv://metalvampire77:5PmGwKUThvzBP4As@cluster0.19kq6o2.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (err) => {
console.error('MongoDB connection error:', err);
});
  
db.once('open', () => {
console.log('Connected to MongoDB');
});

app.listen(5000, () => {
    console.log(`Server is listening on port 5000`);
});

app.post('/register',(req,res) => {
    UserModel.create(req.body)
    .then(employee => res.json(employee))
    .catch(err => res.json(err))
})

app.post('/login',(req,res) => {
    const {email, password} = req.body
    UserModel.findOne({email: email})
    .then(user => {
        if(user){
            if(user.password === password) res.json('success')
            else res.json(`wrong password`)
        }
        else res.json(`user not found`)
    })
    
})