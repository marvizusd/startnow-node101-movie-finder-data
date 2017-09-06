const express = require('express');
const morgan = require('morgan');
const axios = require('axios');
const website = 'http://www.omdbapi.com/?apikey=8730e0e&'
const encode = encodeURIComponent;
const app = express();
let cache={};

app.use(morgan('dev'));
// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter
app.get('/', function(req,res){
    let param = null;
    let key = null;
    
    if(req.query.hasOwnProperty('i')){
        key = req.query.i;
        param = 'i=' + encode(key);
    } else if (req.query.hasOwnProperty('t')){
        key = req.query.t;
        param = 't=' + encode(key);
    }

    if(cache.hasOwnProperty(key)){
        res.json(cache[key]);
    }else {
        console.log(website+param);
        axios.get(website + param)
        .then(function(response){
            cache[key] = response.data;
            res.json(cache[key]);
        });
    };

    });

app.get('/data', function(req,res){
    res.json(cache);
})



//http://www.omdbapi.com/?apikey=8730e0e&
module.exports = app;