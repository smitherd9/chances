var Data = [];
var page = 0;
var itemsPerPage = 3;
var totalPages = 0;



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

    var dropdownReset = function() {
        $("#dropdownMenuButton1:parent").text('Select a NYC zipcode for which there is data');        
        $("#dropdownMenuButton1:parent").val($(this).text())
        $("#dropdownMenuButton2:parent").text('Select a type of cuisine');
        $("#dropdownMenuButton2:parent").val($(this).text())
    };


    $(".dropdown1").on('click', 'li a', function(e){
      e.preventDefault();
      $("#dropdownMenuButton1:first-child").text($(this).text());
      $("#dropdownMenuButton1:first-child").val($(this).text());
   });

    $(".dropdown2").on('click', 'li a', function(e){
      e.preventDefault();
      $("#dropdownMenuButton2:first-child").text($(this).text());
      $("#dropdownMenuButton2:first-child").val($(this).text());
   });



    $('#search-btn').on('click', function(e){
      e.preventDefault();
      if (($('#dropdownMenuButton1').val() == "") && 
        ($('#dropdownMenuButton2').val() == "" ) && ($('#dba').val() == '') ) {
        $('#error-msg').fadeIn(500);
        $('#error-msg').text('Please make a selection');
        setTimeout(function(){
            $('#error-msg').fadeOut(500);
        }, 2000);  

      }
      else {
        getInput();
        dropdownReset();
      }
    });


    $('#load-more-btn').on('click', function() {
        if (page < totalPages - 1) {
            page = page + 1;
            loadData(page);
            console.log(page);

            $('#load-previous-btn').show();
            if (page == totalPages - 1) {
                $('#load-more-btn').hide();
            }
        }
    });

    $('#load-previous-btn').on('click', function() {
        if (page > 0) {
            page = page - 1;
            loadData(page);
            console.log(page);
            $('#load-more-btn').show();
            if (page == 0) {
                $('#load-previous-btn').hide();
            }
        }
    });





    // Function for pagination, loads 3 more results for each button click   
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

        var cuisine = $('#dropdownMenuButton2').val();
        var zip = $('#dropdownMenuButton1').val();
        var dba = $('#dba').val();

        if ((zip) && (cuisine) && (dba)) {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            query.zipcode = zip;
            query.cuisine_description = cuisine;
            byZipCuisineAndDba(zip, cuisine, dbaUpper, query);
            $('#dba').val('');
        }

        else if ((zip) && (dba)) {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            query.zipcode = zip;
            byZipAndDba(zip, dbaUpper, query);
            $('#dba').val('');
        }

        else if ((zip) && (cuisine)) {
            query.zipcode = zip;
            byZipAndCuisine(zip, cuisine, query);            
        }

        else if ((cuisine) && (dba)) {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            query.cuisine_description = cuisine;
            byCuisineAndDba(dbaUpper, cuisine, query);            
        }


        else if (cuisine) {
            byCuisine(cuisine, query);
        }     
        

        else if (zip) {
          console.log('zip value: ' + zip);
            query.zipcode = zip;
            byZip(zip, query);
        }

        else {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            byDba(dbaUpper, query);
            $('#dba').val('');
        }
        



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
        $('#overallRating-h2').show();
        $('#vioDesc-h3').show();
        $('#inspDate-h3').show();
        $('#restName-h3').show();
        $('#displayScore').html('');
        clearResults();
        Data = [];


        Data.push(data);
        totalPages = data.vioDesc.length / itemsPerPage;
        console.log(data);
        console.log('totalPages: ' + totalPages);

        var sortInspectionDate = function() {
            console.log('in sortInspDate');
            data.vioDesc.sort(function(a, b) {
                if (a.inspection_date > b.inspection_date) {
                    return -1;
                }

                if (a.inspection_date < b.inspection_date) {
                    return 1;
                }

                return 0;
            });
            console.log('at end of InspDate: ' + data);
            return data.vioDesc;


        }

        sortInspectionDate();

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
        $.ajax('http://localhost:8080/zip/' + zip, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byZipAndDba = function(zip, dba, query) {
        $.ajax('http://localhost:8080/zipdba/' + zip + '/' + dba, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byZipCuisineAndDba = function(zip, cuisine, dba, query) {
        console.log('in ajax call: ' + cuisine);
        console.log('in ajax call: ' + dba);
        $.ajax('http://localhost:8080/zipcuisinedba/' + dba + '/' + zip + '/' + cuisine, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byZipAndCuisine = function(zip, cuisine, query) {
        $.ajax('http://localhost:8080/zipcuisine/' + zip + '/' + cuisine, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byCuisineAndDba = function(dba, cuisine, query) {
        $.ajax('http://localhost:8080/cuisinedba/' + dba + '/' + cuisine, {
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
        $.ajax('http://localhost:8080/cuisine/' + cuisine, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };



});
