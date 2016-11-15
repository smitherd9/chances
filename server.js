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
    score: [],
    grade: [],

};

// app.get('/all/:zip/:dba/:cuisine_description', function(req, res) {
//     console.log('req.query: ', req.query);
//     console.log('req.params: ', req.params);
//     req.query.zipcode = req.params.zip;
//     req.query.dba = req.params.dba;
//     req.query.cuisine_description = req.params.cuisine_description;
//     req.query.$limit = 15;
//     req.query.$$app_token = "bOdo0GBO11GSiRssvuQLv0t3A";

//     unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
//         .query(req.query)


//     .end(function(response) {
//         console.log(response.body);
//         console.log("res.body.length: ", response.body.length);
//         Data.vioDesc = [];
//         Data.grade = [];
//         Data.score = [];
//         storeInData(response.body);
//         var sendData = function(Data) {
//             res.json(Data);
//             Data.chancesRating = 0;

//         };

//         sendData(Data);
//     });

// });


app.get('/zip/:zip', function(req, res) {
    console.log('req.query: ', req.query); //should log the data that was sent from client 
    console.log('req.params: ', req.params);
    req.query.zipcode = req.params.zip;
    console.log('r.q.zip: ', req.query.zipcode, typeof(req.query.zipcode));
    req.query.$limit = 15;
    req.query.$$app_token = "bOdo0GBO11GSiRssvuQLv0t3A";

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
        console.log(response.body);
        console.log("res.body.length: ", response.body.length);
        Data.vioDesc = [];
        Data.grade = [];
        Data.score = [];
        storeInData(response.body);
        var sendData = function(Data) {
            res.json(Data);
            Data.chancesRating = 0;

        };

        sendData(Data);
    });

});



app.get('/dba/:dba', function(req, res) {
    console.log('req.query: ', req.query); //should log the data that was sent from client 
    console.log('req.params: ', req.params);
    req.query.dba = req.params.dba;
    req.query.$limit = 15;
    req.query.$$app_token = "bOdo0GBO11GSiRssvuQLv0t3A";

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
        console.log(response.body);
        console.log("res.body.length: ", response.body.length);
        Data.vioDesc = [];
        Data.grade = [];
        Data.score = [];
        storeInData(response.body);
        var sendData = function(Data) {
            console.log('Line 102 Chances Rating: ', Data.chancesRating);
            res.json(Data);
            Data.chancesRating = 0;

        };
        sendData(Data);
    });

});


app.get('/cuisine/:cuisine_description', function(req, res) {
    console.log('req.query: ', req.query); //should log the data that was sent from client 
    console.log('req.params: ', req.params);
    req.query.cuisine_description = req.params.cuisine_description;
    req.query.$limit = 15;
    req.query.$$app_token = "bOdo0GBO11GSiRssvuQLv0t3A";

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
        console.log(response.body);
        console.log("res.body.length: ", response.body.length);
        Data.vioDesc = [];
        Data.grade = [];
        Data.score = [];
        storeInData(response.body);
        var sendData = function(Data) {
            res.json(Data);
            Data.chancesRating = 0;
        };
        sendData(Data);
    });

});


var storeInData = function(response) {
    for (let i = 0; i < response.length; i++) {
        var data = response[i];
        console.log('storeInData: ', data.zipcode);

        if (data.hasOwnProperty('violation_description') && (data.hasOwnProperty('inspection_date')) && (data.hasOwnProperty('dba'))) {
            Data.vioDesc.push({
                'inspection_date': data.inspection_date,
                'description': data.violation_description,
                'dba': data.dba
            });
        }

        if (data.hasOwnProperty('score')) {
            Data.score.push(+data.score);
            console.log(Data.score);
        }

        if (data.hasOwnProperty('grade')) {
            Data.grade.push(data.grade);
        }

    }

    finalChancesScore();

};

var finalChancesScore = function() {
    var gradeNum = [];
    var sum = Data.score.reduce(function(a, b) {
        return a + b;
    }, 0);
    console.log('sum: ', sum);

    var avg = sum / Data.score.length;
    console.log('avg: ', avg);
    
    if (avg < 14) {
        Data.chancesRating = Data.chancesRating + 1;
    }

    else if ((avg >= 14) && (avg < 28)) {
        Data.chancesRating = Data.chancesRating + 4;
    }
    else if (avg > 28) {
        Data.chancesRating = Data.chancesRating + 8;
    }

    var numOfA = Data.grade.reduce(function(d, e) {
        if (e === "A")
            d++;
        return d;
    }, 0);
    console.log('numOfA: ', numOfA);
    gradeNum.push(numOfA);

    var numOfB = Data.grade.reduce(function(f, g) {
        if (g === "B")
            f++;
        return f;
    }, 0);
    console.log('numOfB: ', numOfB);
    gradeNum.push(numOfB);

    var numOfC = Data.grade.reduce(function(h, i) {
        if (i === "C")
            h++;
        return h;
    }, 0);
    console.log('numOfC: ', numOfC);
    gradeNum.push(numOfC);

    var numOfP = Data.grade.reduce(function(j, k) {
        if (k === "P")
            j++;
        return j;
    }, 0);
    console.log('numOfP:', numOfP);
    gradeNum.push(numOfP);

    var numOfN = Data.grade.reduce(function(l, m) {
        if (m === "N")
            l++;
        return l;
    }, 0);
    console.log('numOfN: ', numOfN);
    gradeNum.push(numOfN);
    console.log('gradeNum: ', gradeNum);



    var AvgA = numOfA / Data.grade.length;
    console.log('avg A: ', AvgA);

    var AvgB = numOfB / Data.grade.length;
    console.log('avg B: ', AvgB);

    var AvgC = numOfC / Data.grade.length;
    console.log('avg C: ', AvgC);

    var AvgP = numOfP / Data.grade.length;
    console.log('avg P: ', AvgP);

    var AvgN = numOfN / Data.grade.length;
    console.log('avg N: ', AvgN);

    console.log('math.max: ', Math.max(AvgA, AvgB, AvgC, AvgP, AvgN));

    if (AvgA === Math.max(AvgA, AvgB, AvgC, AvgP, AvgN)) {
        Data.chancesRating = Data.chancesRating - 1;
        console.log('Line 251 Chances Rating: ', Data.chancesRating);
    }
    if (AvgB === Math.max(AvgA, AvgB, AvgC, AvgP, AvgN)) {
        Data.chancesRating = Data.chancesRating + 1;
    }
    if (AvgC === Math.max(AvgA, AvgB, AvgC, AvgP, AvgN)) {
        Data.chancesRating = Data.chancesRating + 2;
    }
    if (AvgP === Math.max(AvgA, AvgB, AvgC, AvgP, AvgN)) {
        Data.chancesRating = Data.chancesRating + 4;
    }
    
    if ((AvgA != 0) && (AvgA === AvgB)) {
        Data.chancesRating = Data.chancesRating;
    }
    
    if ((AvgA != 0) && (AvgA === AvgC)) {
        Data.chancesRating = Data.chancesRating + 1;
    }
    
    if ((AvgA != 0) && (AvgA === AvgP)) {
        Data.chancesRating = Data.chancesRating + 2;
    }
    console.log('Line 275 Chances Rating: ', Data.chancesRating);
    
    if ((AvgB != 0) && (AvgB === AvgC)) {
        Data.chancesRating = Data.chancesRating + 1;
    }
    
    if ((AvgB != 0) && (AvgB === AvgP)) {
        Data.chancesRating = Data.chancesRating + 2;
    }
    
    if ((AvgC != 0) && (AvgC === AvgP)) {
        Data.chancesRating = Data.chancesRating + 3;
    }
    console.log('Line 286 Chances Rating: ', Data.chancesRating);
    



};











exports.app = app;


app.listen(process.env.PORT || 8080);