var Data = [];


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
    
    

$('.input-group-btn').click(function(e){
    e.preventDefault();
    getInput();
});

$('.input-group').keypress(function(e){
    if (event.which == 13){
        e.preventDefault();
        getInput();
    }
});

$('.small-screen').hide();

    
   $('#vioDesc-btn').on('click', function(){
   console.log('vioDesc button clicked');
   displayDescription(Data);
   });
  
  var displayDescription = function(Data){
   console.log('Data in displayDescription: ', Data);
   $('.small-screen').show();
   $('#inspDate-btn').fadeOut(500);
   $('#inspDate-h2').fadeOut(500);
   $('#restName-btn').fadeOut(500);
   $('#restName-h2').fadeOut(500);
   
   for (var i = 0; i < Data[0].vioDesc.length; i++){
   $('#vioDesc-small').append("<p>" + Data[0].vioDesc[i].description + "</p></br>");
   $('.small-screen').animateCss('slideInUp');
   }
   console.log('Data[0].vioDesc.length: ', Data[0].vioDesc.length);
   console.log('Data[0].vioDesc[0].description: ', Data[0].vioDesc[0].description);

  };
  
  
  $('#inspDate-btn').on('click', function(){
   console.log('inspDate button clicked');
   displayInspDate(Data);
  });
  
  var displayInspDate = function(){
   $('.small-screen').show();
   $('#vioDesc-btn').fadeOut(500);
   $('#vioDesc-h2').fadeOut(500);
   $('#restName-btn').fadeOut(500);
   $('#restName-h2').fadeOut(500);
   
   for (var i = 0; i < Data[0].vioDesc.length; i++){
   $('#inspDate-small').append("<p>" + moment(Data[0].vioDesc[i].inspection_date).fromNow() + "</p></br>");
   $('.small-screen').animateCss('slideInUp');
  }
}

   $('#restName-btn').on('click', function(){
   console.log('restName button clicked');
   displayRestName(Data);
  });

  
  var displayRestName = function(Data){
   $('.small-screen').show();
   $('#inspDate-btn').fadeOut(500);
   $('#inspDate-h2').fadeOut(500);
   $('#vioDesc-btn').fadeOut(500);
   $('#vioDesc-h2').fadeOut(500);
  
   for (var i = 0; i < Data[0].vioDesc.length; i++){
   $('#restName-small').append("<p>" + Data[0].vioDesc[i].dba + "</p></br>");
   $('.small-screen').animateCss('slideInUp');
  }
}
  
  
var getInput = function(){
    var query = {};
    console.log(query);
    
    var cuisine = $('#cuisine').val();
    if ((cuisine) && (zip) && (dba)) {
        query.cuisine_description = cuisine;
        query.zipcode = zip;
        query.dba = dba;
        byAll(cuisine, zip, dba, query);
    }
    if (cuisine) {
        query.cuisine_description = cuisine;
        byCuisine(cuisine, query);
    } 
    console.log(cuisine);
    $('#cuisine').val("");
    
    
    var zip = $('#zip').val();
    if (zip) {
        query.zipcode = zip;
        byZip(zip, query);
    }
    console.log(zip);
    $('#zip').val("");
    
    var dba = $('#dba').val().toUpperCase();
    
    if (dba) {
        query.dba = dba;
        byDba(dba, query);
    } 
    console.log(dba);
    $('#dba').val("");

    
};

var byAll = function(cuisine, zip, dba, query) {
    $.ajax('http://hello-server-smitherd9.c9users.io/all/' + cuisine + zip + dba, {
        type: 'GET',
        data: query,
        dataType: 'json'
    })
    
    .done(function(data){
        console.log(data);
        $('#displayDate').html('');
        $('#displayDesc').html('');
        $('#displayName').html('');
        $('#displayScore').html('');
        
        $("#displayScore").append("<p>" + data.chancesRating + "</p>").animateCss('slideInLeft');
        
        $.each(data.vioDesc, function(index, value){
            console.log(value.inspection_date);
            $("#displayDate").append("<p>" + moment(value.inspection_date).fromNow() + "</p></br>").animateCss('fadeInUp');      
            $("#displayDesc").append("<p>" + value.description + "</p></br>").animateCss('slideInRight');
            $("#displayName").append("<p>" + value.dba + "</p></br>").animateCss('slideInRight');
        });
        
    });
}

var byZip = function(zip, query) {
    $.ajax('http://hello-server-smitherd9.c9users.io/zip/' + zip, {
        type: 'GET',
        data: query,
        dataType: 'json'
    })
    
    .done(function(data){
        console.log(data);
        $('#displayDate').html('');
        $('#displayDesc').html('');
        $('#displayName').html('');
        $('#displayScore').html('');
        Data.push(data);
        console.log(Data);
        
        $("#displayScore").append("<p>" + data.chancesRating + "</p>").animateCss('slideInLeft');
        
        $.each(data.vioDesc, function(index, value){
            console.log(value.inspection_date);
            $("#displayDate").append("<p>" + moment(value.inspection_date).fromNow() + "</p></br>").animateCss('fadeInUp');      
            $("#displayDesc").append("<p>" + value.description + "</p></br>").animateCss('slideInRight');
            $("#displayName").append("<p>" + value.dba + "</p></br>").animateCss('slideInRight');
            

            
        });
        
    });
}


var byDba = function(dba, query) {
    $.ajax('http://hello-server-smitherd9.c9users.io/dba/' + dba, {
        type: 'GET',
        data: query,
        dataType: 'json'
    })
    
    .done(function(data){
        console.log(data);
        $('#displayDate').html('');
        $('#displayDesc').html('');
        $('#displayName').html('');
        $('#displayScore').html('');
        
        $("#displayScore").append("<p>" + data.chancesRating + "</p>").animateCss('slideInLeft');
        
        $.each(data.vioDesc, function(index, value){
            console.log(value.inspection_date);
            $("#displayDate").append("<p>" + moment(value.inspection_date).fromNow() + "</p></br>").animateCss('fadeInUp');      
            $("#displayDesc").append("<p>" + value.description + "</p></br>").animateCss('slideInRight');
            $("#displayName").append("<p>" + value.dba + "</p></br>").animateCss('slideInRight');
        });
        
    });
}


var byCuisine = function(cuisine, query) {
    $.ajax('http://hello-server-smitherd9.c9users.io/cuisine/' + cuisine, {
        type: 'GET',
        data: query,
        dataType: 'json'
    })
    
    .done(function(data){
        console.log(data);
        $('#displayDate').html('');
        $('#displayDesc').html('');
        $('#displayName').html('');
        $('#displayScore').html('');
        
        $("#displayScore").append("<p>" + data.chancesRating + "</p>").animateCss('slideInLeft');
        
        $.each(data.vioDesc, function(index, value){
            console.log(value.inspection_date);
            
            $("#displayDate").append("<p>" + moment(value.inspection_date).fromNow() + "</p></br>").animateCss('fadeInUp');      
            $("#displayDesc").append("<p>" + value.description + "</p></br>").animateCss('slideInRight');
            $("#displayName").append("<p>" + value.dba + "</p></br>").animateCss('slideInRight');
        });
        
    });
};



});




