var express = require('express');
var unirest = require('unirest');
var app = express();
app.use(express.static('public'));



// use unirest to make ajax request to nyc open data and get response
// you need to determine which data you want to use, make a get request to get that data
// once you have the data, save data as variable, do something with it, and return it to the user

app.get('/test', function(req, res){
    unirest.get('https://data.cityofnewyork.us/resource/9w7m-hzhe.json?')
    .query({
        'zipcode': '10021',
        'critical_flag': 'Critical'
        // 'score': '1'
    })
    // .query('zipcode=10021&violation_code=10F&score=4')
    .send({ "$limit": 10, 
    "$$app_token": "bOdo0GBO11GSiRssvuQLv0t3A",
    // "$where": "critical_flag=Critical",
    // "zipcode": '10021'
    // "grade": "A"
    })
    .end(function(response) {
    console.log(response);
    // console.log('Headers: ', response.headers);
    // console.log('Body:', response.body);
    
    
    res.json(response.body);
    
});
})




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