$(document).ready(function() {


$.ajax({
    url: "https://data.cityofnewyork.us/resource/9w7m-hzhe.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "bOdo0GBO11GSiRssvuQLv0t3A"
    }
}).done(data) {
  console.log(data);
});




});