const express = require('express');
const srcListe = require('./data/liste');
const mongoose= require('mongoose');
const bodyParser = require('body-parser')
const uri = "mongodb+srv://florencebkl:<dieselle57>@clusterflorence.jesee.mongodb.net/<dbname>?retryWrites=true&w=majority";
const Eleve = require('./model/eleves');
var app = express();
var promise = mongoose.connect(uri, {useNewUrlParser: true});

promise.then((db) =>{
    console.log('DB connected');
    app.listen(3000, () =>{
        console.log('Listening on port 3000!');
    });
});

 app.use('/pages', express.static('./client/pages'));
 app.use('/js', express.static('./client/js'));
 app.use('/css', express.static('./client/css'));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());

 app.get('/', (req, res) =>{
     res.sendFile(__dirname + '/client/index.html');
 });

 app.get('/liste', (req, res) =>{

    res.send(srcListe);
 });


app.post('/eleves', (req, res) =>{
    var newEleve = new Eleve(req.body);
    console.log(newEleve);
    newEleve.save((err, obj) =>{
        if(err) {
            console.log(err);
            return res.send(500);
        }
        res.sendStatus(200);
    });
});

app.get('/eleves', (req, res) =>{

    Eleves.find({}, (err, obj) => {
        if(err){
            console.log(err);
            return res.send(500);
        }
        return res.send(obj);
    });
});
 
app.get('/eleves/:id', (req, res) =>{
Eleves.findOne({_id: req.params.id}, (err, obj) =>{
    if(err){
        console.log(err);
        return res.send(500);
    }

    return res.send(obj);
    })
});


app.put('/eleves/:id', (req, res) =>{
    Eleves.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}, (err, obj) =>{
        if(err){
            console.log(err);
            return res.send(500);
        }
        res.send(obj);
    });
    
    });



app.delete('/eleves/:id', (req, res) =>{
Eleves.deleteOne({_id: req.params.id}, (err, obj) =>{
    if(err) {
        console.log(err);
        res.send(500);
    }
    res.sendStatus(200);
});
});
    
