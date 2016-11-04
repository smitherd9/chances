'use strict'


var express = require('express');
var unirest = require('unirest');
var app = express();
var jsonParser = require('body-parser');
app.use(express.static('public'));
app.use(jsonParser.json());


var Data = {
    chancesRating: 0
}



var chancesRating = 0;


// use unirest to make ajax request to nyc open data and get response
// you need to determine which data you want to use, make a get request to get that data
// once you have the data, save data as variable, do something with it, and return it to the user

app.get('/test', function(req, res){
    console.log(req.body);  //should log the data that was sent from client 
    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
    .query({
        'zipcode': req.params.zip,
        'critical_flag': 'Critical',
        '$limit': 2,
        '$$app_token': "bOdo0GBO11GSiRssvuQLv0t3A"
        // 'score': '1'
    })
    
    
    .end(function(response) {
    // console.log(response.body[0].score);
    // console.log(response.body[0].violation_description);
    
    
    var getData = function(data){
        var critical = data.critical_flag;
        var score = data.score;
        var zipcode = data.zipcode;
        var cuisine = data.cuisine;
        var vioCode = data.violation_code;
        var vioDesc = data.violation_descripton;
        var dba = data.dba;
        
        // consider score relates to multiple restaurants -- with 2 rest critical chancesRating = 20
        if (critical === 'Critical') {
            Data.chancesRating = Data.chancesRating + 10;
            
            
        }
    };
    
    var sendData = function(Data){
        res.json(Data);
    }
    
      for (let i = 0; i < response.body.length; i++) {
        var data = response.body[i];
        console.log(data.zipcode);
        getData(data);
        
    }
    
    sendData(Data);
    
    
    
    
    // res.json(response.body);
  
   
    
    // console.log('Headers: ', response.headers);
    // console.log('Body:', response.body);
    
});
});

// app.post('/')










// $.ajax({
//     url: "https://data.cityofnewyork.us/resource/9w7m-hzhe.json",
//     type: "GET",
//     data: {
//       "$limit" : 5000,
//       "$$app_token" : "bOdo0GBO11GSiRssvuQLv0t3A"
//     }
// }).done(data) {
//   console.log(data);
// };









exports.app = app;


app.listen(process.env.PORT || 8080);