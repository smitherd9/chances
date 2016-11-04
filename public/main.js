$(document).ready(function() {

var MOCK_RESTAURANT_DATA = {
    'restaurantData':  [
            {
            'zipcode': '10021',
            'critical_flag': 'Critical',
            'cuisine_description': 'Japanese',
            'dba': 'KO SUSHI',
            'score': '31',
            'violation_code': '04N',
            'violation_description': 'Filth flies or food/refuse/sewage-associated (FRSA) flies present in facility\u001as food and/or non-food areas. Filth flies include house flies, little house flies, blow flies, bottle flies and flesh flies. Food/refuse/sewage-associated flies include fruit flies, drain flies and Phorid flies.'
            },
            
            {
            'zipcode': '10021',
            'critical_flag': 'Critical',
            'cuisine_description': 'Italian',
            'dba': 'NUMERO 28',
            'score': '24',
            'violation_code': '02I',
            'violation_description': 'Food prepared from ingredients at ambient temperature not cooled to 41Âº F or below within 4 hours.'
            }
        ]
        
    
};


var getRestaurantData = function(callBackFn){
    setTimeout(function(){
        callBackFn(MOCK_RESTAURANT_DATA);
    }, 1);
};


var displayRestaurantData = function(data){
    for (item in data.restaurantData) {
    $('#displayResults').append('<p>' + data.restaurantData[index].text + '</p>');
    }
};


$('#submit').click(function(e){
    e.preventDefault();
    getInput();
});

var getInput = function(){
    
    var zip = $('#zip').val();
    console.log(zip);
    $.ajax('http://hello-server-smitherd9.c9users.io/test', {
        type: 'GET',
        data: {"zip": zip}
    })
    
    
    .done(function(data){
        console.log(data);
    });
    
    var street = $('#street').val();
    console.log(street);
    var cuisine = $('#cuisine').val();
    console.log(cuisine);
};









});




