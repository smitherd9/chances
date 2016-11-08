'use strict'


var express = require('express');
var unirest = require('unirest');
var app = express();
var jsonParser = require('body-parser');
app.use(express.static('public'));
app.use(jsonParser.json());

var Data = {
    chancesRating: 0,
    vioDesc: "",
    date: ""
        

};





// use unirest to make ajax request to nyc open data and get response
// you need to determine which data you want to use, make a get request to get that data
// once you have the data, save data as variable, do something with it, and return it to the user

app.get('/test/:zip', function(req, res) {
    console.log(req.query); //should log the data that was sent from client 
    console.log(req.params);
    req.query.zipcode = req.params.zip;
    req.query.$limit = 30;
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
            // Data.vioDesc = Data.vioDesc + ', ' + vioDesc;       
            // Data.vioDesc = vioDesc + ', '; 
            
            // response.body.sort(function(data){
            //     if (data.hasOwnProperty('violation_description') && (data.hasOwnProperty('inspection_date'))) {
            //         Data.vioDesc = vioDesc + ', Date: ' + date + ' ' + Data.vioDesc;
            //     }
                
            // });
            
            
            // Data.vioDesc = vioDesc + ', ' + Data.vioDesc;
            // Data.date = date + ', ' + Data.date;

            // consider score relates to multiple restaurants -- with 2 rest critical chancesRating = 2
            if (critical === 'Critical') {
                Data.chancesRating = Data.chancesRating + 2;
                if ((score >= 14) && (score < 28)) {
                    Data.chancesRating = Data.chancesRating + 4;
                }
                else if (score > 28) {
                    Data.chancesRating = Data.chancesRating + 8
                }
            }
            
            switch (grade) {
                case 'B':
                    Data.chancesRating = Data.chancesRating + 1;
                    break;
                case 'C':
                    Data.chancesRating = Data.chancesRating + 2;
                    break;
                case 'P': 
                    Data.chancesRating = Data.chancesRating + 3;
                    break;
            }
            
        };
        
        for (let i = 0; i < response.body.length; i++) {
            var data = response.body[i];
            console.log(data.zipcode);
            
                if (data.hasOwnProperty('violation_description') && (data.hasOwnProperty('inspection_date'))) {
                    Data.vioDesc = data.violation_description + ', Date: ' + data.inspection_date + ' ' + Data.vioDesc;
                }
                
            
            getData(data);

        }

        var sendData = function(Data) {
            res.json(Data);
            Data.chancesRating = 0;
        }
        

        sendData(Data);


    });
});




exports.app = app;


app.listen(process.env.PORT || 8080);