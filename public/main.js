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

  $('.small-screen').hide();
  $('#vioDesc-btn-hide').hide();
  $('#inspDate-btn-hide').hide();
  $('#restName-btn-hide').hide();


  // Button Listeners

  $('.input-group-btn').click(function(e) {
    e.preventDefault();
    getInput();
  });

  $('.input-group').keypress(function(e) {
    if (event.which == 13) {
      e.preventDefault();
      getInput();
    }
  });

  $('#vioDesc-btn').on('click', function() {
    displayDescription(Data);
  });

  $('#vioDesc-btn-hide').on('click', function() {

    hideDescription();
  });

  $('#inspDate-btn').on('click', function() {
    displayInspDate(Data);
  });

  $('#inspDate-btn-hide').on('click', function() {
    hideInspDate();
  });

  $('#restName-btn').on('click', function() {
    displayRestName(Data);
  });

  $('#restName-btn-hide').on('click', function() {
    hideRestName();
  });

  // Display functions for small screens 768px and under

  var displayDescription = function(Data) {
    $('.small-screen').show();
    $('#inspDate-btn').fadeOut(500);
    $('#inspDate-h2').fadeOut(500);
    $('#restName-btn').fadeOut(500);
    $('#restName-h2').fadeOut(500);
    $('#vioDesc-btn').fadeOut(500);
    $('#vioDesc-btn-hide').fadeIn(500);

    for (var i = 0; i < Data[0].vioDesc.length; i++) {
      $('#vioDesc-small').append('<p>' + Data[0].vioDesc[i].description + '</p></br>');
      $('.small-screen').animateCss('slideInUp');
    }
  };

  var hideDescription = function() {
    $('#inspDate-btn').fadeIn(500);
    $('#inspDate-h2').fadeIn(500);
    $('#restName-btn').fadeIn(500);
    $('#restName-h2').fadeIn(500);
    $('#vioDesc-btn').fadeIn(500);
    $('#vioDesc-btn-hide').fadeOut(500);
    $('.small-screen').animateCss('slideOutDown');
    setTimeout(function() {
      $('#vioDesc-small').html('');
    }, 300);

  };

  var displayInspDate = function() {
    $('.small-screen').show();
    $('#vioDesc-btn').fadeOut(500);
    $('#vioDesc-h2').fadeOut(500);
    $('#restName-btn').fadeOut(500);
    $('#restName-h2').fadeOut(500);
    $('#inspDate-btn').fadeOut(500);
    $('#inspDate-btn-hide').fadeIn(500);

    for (var i = 0; i < Data[0].vioDesc.length; i++) {
      $('#inspDate-small').append('<p>' + moment(Data[0].vioDesc[i].inspection_date).fromNow() + '</p></br>');
      $('.small-screen').animateCss('slideInUp');
    }
  };

  var hideInspDate = function() {
    $('#inspDate-btn').fadeIn(500);
    $('#inspDate-btn-hide').fadeOut(500);
    $('#restName-btn').fadeIn(500);
    $('#restName-h2').fadeIn(500);
    $('#vioDesc-btn').fadeIn(500);
    $('#vioDesc-h2').fadeIn(500);
    $('.small-screen').animateCss('slideOutDown');
    setTimeout(function() {
      $('#inspDate-small').html('');
    }, 300);

  };

  var displayRestName = function(Data) {
    $('.small-screen').show();
    $('#inspDate-btn').fadeOut(500);
    $('#inspDate-h2').fadeOut(500);
    $('#vioDesc-btn').fadeOut(500);
    $('#vioDesc-h2').fadeOut(500);
    $('#restName-btn').fadeOut(500);
    $('#restName-btn-hide').fadeIn(500);

    for (var i = 0; i < Data[0].vioDesc.length; i++) {
      $('#restName-small').append('<p>' + Data[0].vioDesc[i].dba + '</p></br>');
      $('.small-screen').animateCss('slideInUp');
    }
  };

  var hideRestName = function() {
    $('#inspDate-btn').fadeIn(500);
    $('#inspDate-h2').fadeIn(500);
    $('#restName-btn').fadeIn(500);
    $('#restName-btn-hide').fadeOut(500);
    $('#vioDesc-btn').fadeIn(500);
    $('#vioDesc-h2').fadeIn(500);
    $('.small-screen').animateCss('slideOutDown');
    setTimeout(function() {
      $('#restName-small').html('');
    }, 300);

  };



  // Function for getting input from the user

  var getInput = function() {
    var query = {};

    var cuisine = $('#cuisine').val();   
      
 
    if (cuisine) {
      var upper = cuisine[0].toUpperCase();
      var lower = cuisine.slice(1).toLowerCase();
      var newCuisineString = upper + lower;
      query.cuisine_description = newCuisineString;
      byCuisine(newCuisineString, query);
    }
    $('#cuisine').val('');

    var zip = $('#zip').val();
    if (zip) {
      query.zipcode = zip;
      byZip(zip, query);
    }
    $('#zip').val('');

    var dba = $('#dba').val().toUpperCase();

    if (dba) {
      query.dba = dba;
      byDba(dba, query);
    }
    $('#dba').val('');
    
  };


  // AJAX requests to What are the Chances? API 

  var byZip = function(zip, query) {
    $.ajax('http://localhost:8080/zip/' + zip, {
      type: 'GET',
      data: query,
      dataType: 'json'
    })

    .done(function(data) {
      $('#displayDate').html('');
      $('#displayDate2').html('');
      $('#displayDate3').html('');

      $('#displayDesc').html('');
      $('#displayDesc2').html('');
      $('#displayDesc3').html('');
      
      $('#displayName').html('');
      $('#displayName2').html('');
      $('#displayName3').html('');
      
      $('#displayScore').html('');

      Data.push(data);
      console.log(data);

      $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');

      $('#displayDate').append('<p>' + moment(data.vioDesc[0].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');
      $('#displayDate2').append('<p>' + moment(data.vioDesc[1].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');
      $('#displayDate3').append('<p>' + moment(data.vioDesc[2].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');

      $('#displayDesc').append('<p>' + data.vioDesc[0].description + '</p></br>').animateCss('slideInRight');        
      $('#displayDesc2').append('<p>' + data.vioDesc[1].description + '</p></br>').animateCss('slideInRight');
      $('#displayDesc3').append('<p>' + data.vioDesc[2].description + '</p></br>').animateCss('slideInRight');
      
      $('#displayName').append('<p>' + data.vioDesc[0].dba + '</p></br>').animateCss('slideInRight');
      $('#displayName2').append('<p>' + data.vioDesc[1].dba + '</p></br>').animateCss('slideInRight');
      $('#displayName3').append('<p>' + data.vioDesc[2].dba + '</p></br>').animateCss('slideInRight');


    });
  };


  var byDba = function(dba, query) {
    $.ajax('https://boiling-shelf-21235.herokuapp.com/dba/' + dba, {
      type: 'GET',
      data: query,
      dataType: 'json'
    })

    .done(function(data) {
      $('#displayDate').html('');
      $('#displayDate2').html('');
      $('#displayDate3').html('');

      $('#displayDesc').html('');
      $('#displayDesc2').html('');
      $('#displayDesc3').html('');
      
      $('#displayName').html('');
      $('#displayName2').html('');
      $('#displayName3').html('');
      
      $('#displayScore').html('');
      console.log(data);

      $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');

      $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');

      $('#displayDate').append('<p>' + moment(data.vioDesc[0].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');
      $('#displayDate2').append('<p>' + moment(data.vioDesc[1].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');
      $('#displayDate3').append('<p>' + moment(data.vioDesc[2].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');

      $('#displayDesc').append('<p>' + data.vioDesc[0].description + '</p></br>').animateCss('slideInRight');        
      $('#displayDesc2').append('<p>' + data.vioDesc[1].description + '</p></br>').animateCss('slideInRight');
      $('#displayDesc3').append('<p>' + data.vioDesc[2].description + '</p></br>').animateCss('slideInRight');
      
      $('#displayName').append('<p>' + data.vioDesc[0].dba + '</p></br>').animateCss('slideInRight');
      $('#displayName2').append('<p>' + data.vioDesc[1].dba + '</p></br>').animateCss('slideInRight');
      $('#displayName3').append('<p>' + data.vioDesc[2].dba + '</p></br>').animateCss('slideInRight');

    });
  }


  var byCuisine = function(cuisine, query) {
    $.ajax('https://boiling-shelf-21235.herokuapp.com/cuisine/' + cuisine, {
      type: 'GET',
      data: query,
      dataType: 'json'
    })

    .done(function(data) {
      $('#displayDate').html('');
      $('#displayDate2').html('');
      $('#displayDate3').html('');

      $('#displayDesc').html('');
      $('#displayDesc2').html('');
      $('#displayDesc3').html('');
      
      $('#displayName').html('');
      $('#displayName2').html('');
      $('#displayName3').html('');
      
      $('#displayScore').html('');
      console.log(data);

      $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');

      $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');

      $('#displayDate').append('<p>' + moment(data.vioDesc[0].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');
      $('#displayDate2').append('<p>' + moment(data.vioDesc[1].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');
      $('#displayDate3').append('<p>' + moment(data.vioDesc[2].inspection_date).fromNow() + '</p></br>').animateCss('fadeInUp');

      $('#displayDesc').append('<p>' + data.vioDesc[0].description + '</p></br>').animateCss('slideInRight');        
      $('#displayDesc2').append('<p>' + data.vioDesc[1].description + '</p></br>').animateCss('slideInRight');
      $('#displayDesc3').append('<p>' + data.vioDesc[2].description + '</p></br>').animateCss('slideInRight');
      
      $('#displayName').append('<p>' + data.vioDesc[0].dba + '</p></br>').animateCss('slideInRight');
      $('#displayName2').append('<p>' + data.vioDesc[1].dba + '</p></br>').animateCss('slideInRight');
      $('#displayName3').append('<p>' + data.vioDesc[2].dba + '</p></br>').animateCss('slideInRight');

    });
  };



});
