const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Patient = require('./model/Patient');
const methodOverride = require('method-override');
const app = express();
const PORT = 5004;

mongoose.connect("mongodb://localhost:27017/patientDB");
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', async (req, res) => {
    const patients = await Patient.find();
    res.render('index', { patients });
});

app.post('/save', async (req, res) => {
    const { name, age, gender, diagnosis, entryDate } = req.body;
    const patient = new Patient({ name, age, gender, diagnosis, entryDate });
    await patient.save();
    res.redirect('/');
});

app.put('/update/:id', async (req, res) => {
    const{ name, age, gender, diagnosis, entryDate } = req.body;
     await Patient.findByIdAndUpdate(req.params.id,{ name, age, gender, diagnosis, entryDate });
    res.redirect('/');
});

app.delete('/delete/:id', async (req, res) => {
    await Patient.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server run on Port : ${PORT}`);
});