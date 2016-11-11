'use strict'


var express = require('express');
var unirest = require('unirest');
var app = express();
var jsonParser = require('body-parser');
app.use(express.static('public'));
app.use(jsonParser.json());

var Data = {
    chancesRating: 0,
    vioDesc: [],
    date: "",
    score: []
        

};


app.get('/test/:zip', function(req, res) {
    console.log(req.query); //should log the data that was sent from client 
    console.log(req.params);
    req.query.zipcode = req.params.zip;
    req.query.$limit = 5;
    req.query.$$app_token = "bOdo0GBO11GSiRssvuQLv0t3A";
    
    
    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
        console.log(response.body);
        console.log("res.body.length: ", response.body.length);

        var getData = function(data) {
            var critical = data.critical_flag;
            var score = data.score;
            var zipcode = data.zipcode;
            var cuisine = data.cuisine_description;
            var vioCode = data.violation_code;
            var vioDesc = data.violation_description;
            var dba = data.dba;
            var grade = data.grade;
            var score = data.score;
            var date = data.inspection_date;
            console.log("line 62 chancesRating:", Data.chancesRating);
            

            // switch (grade) {
            //     case 'B':
            //         Data.chancesRating = Data.chancesRating + 1;
            //         break;
            //     case 'C':
            //         Data.chancesRating = Data.chancesRating + 2;
            //         break;
            //     case 'P': 
            //         Data.chancesRating = Data.chancesRating + 3;
            //         break;
            // }
            
        };
        
        for (let i = 0; i < response.body.length; i++) {
            var data = response.body[i];
            console.log(data.zipcode);
            
                if (data.hasOwnProperty('violation_description') && (data.hasOwnProperty('inspection_date'))) {
                    Data.vioDesc.push({'inspection_date': data.inspection_date, 'description': data.violation_description});
                }
                
                if (data.hasOwnProperty('score')) {
                    Data.score.push(+data.score);
                    console.log(Data.score);
                }
                
            
            getData(data);

        }
        
        
        
        var finalChancesScore = function(){
            var sum = Data.score.reduce(function(a, b){
                return a + b;
            }, 0);
            console.log('sum: ', sum);
            
            var avg = sum / Data.score.length;
            console.log('avg: ', avg);
            
            if ((avg >= 14) && (avg < 28)){
                Data.chancesRating = Data.chancesRating + 4;
            }
            else if (avg > 28) {
                Data.chancesRating = Data.chancesRating + 8;
            }
        }
        
        finalChancesScore();

        var sendData = function(Data) {
            res.json(Data);
            Data.chancesRating = 0;
        }
        

        sendData(Data);


    });
});




exports.app = app;


app.listen(process.env.PORT || 8080);