'use strict'


var express = require('express');
var unirest = require('unirest');
var app = express();
var jsonParser = require('body-parser');
app.use(express.static('public'));
app.use(jsonParser.json());
// var GoogleMapsLoader = require('google-maps');

var Data = {
    chancesRating: 0,
    vioDesc: [],
    score: [],
    grade: [],

};





// Search by zipcode

app.get('/zip/:zip', function(req, res) {
    req.query.zipcode = req.params.zip;
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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




// Search by Restaurant Name

app.get('/dba/:dba', function(req, res) {
    req.query.dba = req.params.dba;
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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


// Search by type of cuisine

app.get('/cuisine/:cuisine_description', function(req, res) {
    console.log('req.params.cuisine_description: ' + req.params.cuisine_description);
    req.query.cuisine_description = req.params.cuisine_description;
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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

// Search by zipcode and restaurant name

app.get('/zipdba/:zip/:dba', function(req, res) {
    req.query.zipcode = req.params.zip;
    req.query.dba = req.params.dba;
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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


// Search by zipcode and type of cuisine

app.get('/zipcuisine/:zip/:cuisine_description', function(req, res) {
    req.query.zipcode = req.params.zip;
    req.query.cuisine_description = req.params.cuisine_description;    
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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


// Search by zipcode, type of cuisine and restaurant name

app.get('/zipcuisinedba/:dba/:zip/:cuisine_description', function(req, res) {
    req.query.zipcode = req.params.zip;
    req.query.cuisine_description = req.params.cuisine_description;
    req.query.dba = req.params.dba;
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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

// Search by type of cuisine and restaurant name

app.get('/cuisinedba/:dba/:cuisine_description', function(req, res) {
    console.log('req.params.cuisine_description: ' + req.params.cuisine_description);
    console.log('req.params.dba: ' + req.params.dba);    
    req.query.cuisine_description = req.params.cuisine_description;
    req.query.dba = req.params.dba;    
    req.query.$limit = 10;
    req.query.$$app_token = 'bOdo0GBO11GSiRssvuQLv0t3A';

    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
        .query(req.query)


    .end(function(response) {
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
    // console.log(response.length);
    for (let i = 0; i < response.length; i++) {
        var data = response[i];

        if (data.hasOwnProperty('violation_description') && (data.hasOwnProperty('inspection_date')) && (data.hasOwnProperty('dba')) 
            && (data.hasOwnProperty('cuisine_description')) && (data.hasOwnProperty('building')) 
            && (data.hasOwnProperty('street')) && (data.hasOwnProperty('zipcode'))) {
            Data.vioDesc.push({
                'inspection_date': data.inspection_date,
                'description': data.violation_description,
                'dba': data.dba,
                'cuisine_description': data.cuisine_description,
                'building': data.building,
                'street': data.street,
                'zipcode': data.zipcode
            });
            
        }

        if (data.hasOwnProperty('score')) {
            Data.score.push(+data.score);
        }

        if (data.hasOwnProperty('grade')) {
            Data.grade.push(data.grade);
        }

    }

    
    finalChancesScore();

};



var finalChancesScore = function() {

    var sum = Data.score.reduce(function(a, b) {
        return a + b;
    }, 0);

    var avg = sum / Data.score.length;

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
        if (e === 'A')
            d++;
        return d;
    }, 0);

    var numOfB = Data.grade.reduce(function(f, g) {
        if (g === 'B')
            f++;
        return f;
    }, 0);

    var numOfC = Data.grade.reduce(function(h, i) {
        if (i === 'C')
            h++;
        return h;
    }, 0);

    var numOfP = Data.grade.reduce(function(j, k) {
        if (k === 'P')
            j++;
        return j;
    }, 0);

    var numOfN = Data.grade.reduce(function(l, m) {
        if (m === 'N')
            l++;
        return l;
    }, 0);


    var AvgA = numOfA / Data.grade.length;

    var AvgB = numOfB / Data.grade.length;

    var AvgC = numOfC / Data.grade.length;

    var AvgP = numOfP / Data.grade.length;

    var AvgN = numOfN / Data.grade.length;

    if (AvgA === Math.max(AvgA, AvgB, AvgC, AvgP, AvgN)) {
        Data.chancesRating = Data.chancesRating - 1;

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


    if ((AvgB != 0) && (AvgB === AvgC)) {
        Data.chancesRating = Data.chancesRating + 1;
    }

    if ((AvgB != 0) && (AvgB === AvgP)) {
        Data.chancesRating = Data.chancesRating + 2;
    }

    if ((AvgC != 0) && (AvgC === AvgP)) {
        Data.chancesRating = Data.chancesRating + 3;
    }

};


exports.app = app;


app.listen(process.env.PORT || 8080);