var Data = [];
var page = 0;
var itemsPerPage = 3;


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


  $('#load-more-btn').on('click', function() {
    page = page + 1;
    loadData(page);
    console.log(page);
    $('#load-previous-btn').show();
  });

  $('#load-previous-btn').on('click', function() {
    page = page - 1;
    loadData(page);
    console.log(page);
  });





  // Function for pagination, loads 3 more results for each button click
  // TODO:  Add logic for handling the end of array so user doesn't get undefined displayed
  // TODO:  Add logic to handle showing only one desc, date and name for small screens

  var loadData = function(p) {
    console.log(Data[0]);
    clearResults();
    $('#displayDesc').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 0].description + '</p></br>').animateCss('slideInRight');        
    $('#displayDesc2').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 1].description + '</p></br>').animateCss('slideInRight');
    $('#displayDesc3').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 2].description + '</p></br>').animateCss('slideInRight');

    $('#displayDate').append('<p>' + moment(Data[0].vioDesc[(p * itemsPerPage) + 0].inspection_date).fromNow() + '</p></br>').animateCss('fadeIn');
    $('#displayDate2').append('<p>' + moment(Data[0].vioDesc[(p * itemsPerPage) + 1].inspection_date).fromNow() + '</p></br>').animateCss('fadeIn');
    $('#displayDate3').append('<p>' + moment(Data[0].vioDesc[(p * itemsPerPage) + 2].inspection_date).fromNow() + '</p></br>').animateCss('fadeIn');

    $('#displayName').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 0].dba + '</p></br>').animateCss('fadeIn');
    $('#displayName2').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 1].dba + '</p></br>').animateCss('fadeIn');
    $('#displayName3').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 2].dba + '</p></br>').animateCss('fadeIn');
  }


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



  var clearResults = function() {
      $('#displayDate').html('');
      $('#displayDate2').html('');
      $('#displayDate3').html('');

      $('#displayDesc').html('');
      $('#displayDesc2').html('');
      $('#displayDesc3').html('');
      
      $('#displayName').html('');
      $('#displayName2').html('');
      $('#displayName3').html('');
      
      
  }


  var displayResults = function(data) {
      $('#load-more-btn').show();
      $('#displayScore').html('');
      clearResults();


      Data.push(data);
      console.log(data);

      $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');

      $('#displayDate').append('<p>' + moment(data.vioDesc[0].inspection_date).fromNow() + '</p></br>').animateCss('fadeIn');
      $('#displayDate2').append('<p>' + moment(data.vioDesc[1].inspection_date).fromNow() + '</p></br>').animateCss('fadeIn');
      $('#displayDate3').append('<p>' + moment(data.vioDesc[2].inspection_date).fromNow() + '</p></br>').animateCss('fadeIn');

      $('#displayDesc').append('<p>' + data.vioDesc[0].description + '</p></br>').animateCss('slideInRight');        
      $('#displayDesc2').append('<p>' + data.vioDesc[1].description + '</p></br>').animateCss('slideInRight');
      $('#displayDesc3').append('<p>' + data.vioDesc[2].description + '</p></br>').animateCss('slideInRight');
      
      $('#displayName').append('<p>' + data.vioDesc[0].dba + '</p></br>').animateCss('fadeIn');
      $('#displayName2').append('<p>' + data.vioDesc[1].dba + '</p></br>').animateCss('fadeIn');
      $('#displayName3').append('<p>' + data.vioDesc[2].dba + '</p></br>').animateCss('fadeIn');
  }


  // AJAX requests to What are the Chances? API 

  var byZip = function(zip, query) {
    $.ajax('https://boiling-shelf-21235.herokuapp.com/zip/' + zip, {
      type: 'GET',
      data: query,
      dataType: 'json'
    })

    .done(function(data) {
      displayResults(data);
    });
  };


  var byDba = function(dba, query) {
    $.ajax('https://boiling-shelf-21235.herokuapp.com/dba/' + dba, {
      type: 'GET',
      data: query,
      dataType: 'json'
    })

    .done(function(data) {
      displayResults(data);
    });
  }


  var byCuisine = function(cuisine, query) {
    $.ajax('https://boiling-shelf-21235.herokuapp.com/cuisine/' + cuisine, {
      type: 'GET',
      data: query,
      dataType: 'json'
    })

    .done(function(data) {
      displayResults(data);
    });
  };



});
