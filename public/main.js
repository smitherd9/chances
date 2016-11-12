


$(document).ready(function() {

//Extension function for animateCss
$.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
        }
    });


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


// var getRestaurantData = function(callBackFn){
//     setTimeout(function(){
//         callBackFn(MOCK_RESTAURANT_DATA);
//     }, 1);
// };


// var displayRestaurantData = function(data){
//     for (item in data.restaurantData) {
//     $('#displayResults').append('<p>' + data.restaurantData[index].text + '</p>');
//     }
// };


$('.input-group-btn').click(function(e){
    e.preventDefault();
    getInput();
});

var getInput = function(){
    var query = {};   
    
    var cuisine = $('#cuisine').val();
    if (cuisine) {
        query.cuisine_description = cuisine;
    } 
    console.log(cuisine);
    $('#cuisine').val("");
    var zip = $('#zip').val();
    console.log(zip);
    $('#zip').val("");
    var dba = $('#dba').val().toUpperCase();
    
    if (dba) {
        query.dba = dba;
    } 
    console.log(dba);
    $('#dba').val("");
    
    $.ajax('http://hello-server-smitherd9.c9users.io/test/' + zip, {
        type: 'GET',
        data: query,
        // make decision about when to send this, if sent empty it returns an empty object 
        dataType: 'json'
    })
    
    .done(function(data){
        console.log(data);
        
        $("#displayScore").append("<p>" + data.chancesRating + "</p>").animateCss('slideInLeft');
        
        $.each(data.vioDesc, function(index, value){
            console.log(value.inspection_date);
            $("#displayDate").append("<p>" + moment(value.inspection_date).fromNow() + "</p></br>").animateCss('fadeInUp');       // moment(value.date).fromNow()  or .format()   to format the date
            $("#displayDesc").append("<p>" + value.description + "</p></br>").animateCss('slideInRight');
        });
        
    });
    
    
    
};



});




