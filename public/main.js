var Data = [];
var page = 0;
var itemsPerPage = 3;
var totalPages = 0;
var map;
var markers = [];


// Initialize Google Map

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.735798,
            lng: -73.993369
        },
        zoom: 12,
        mapTypeId: 'roadmap'
    });
}


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
        $("#dropdownMenuButton1:parent").text('NYC zipcode');
        $("#dropdownMenuButton1:parent").val($(this).text())
        $("#dropdownMenuButton2:parent").text('Type of cuisine');
        $("#dropdownMenuButton2:parent").val($(this).text())
    };


    $(".dropdown1").on('click', 'li a', function(e) {
        e.preventDefault();
        $("#dropdownMenuButton1:first-child").text($(this).text());
        $("#dropdownMenuButton1:first-child").val($(this).text());
        $("#zipcodes").collapse('hide');
    });

    $(".dropdown2").on('click', 'li a', function(e) {
        e.preventDefault();
        $("#dropdownMenuButton2:first-child").text($(this).text());
        $("#dropdownMenuButton2:first-child").val($(this).text());
        $("#cuisines").collapse('hide');
    });



    $('#search-btn').on('click', function(e) {
        e.preventDefault();
        ($('#dropdownMenuButton1').val() === "" &&
            $('#dropdownMenuButton2').val() === "" && $('#dba').val() === '') ? 
            $('#error-msg').fadeIn(500): 
            $('#error-msg').text('Please make a selection')
            setTimeout(function() {
                $('#error-msg').fadeOut(500);
            }, 2000);

           getInput();
            dropdownReset();
        
    });


    $('#load-more-btn').on('click', function() {
        if (page < totalPages - 1) {
            page = page + 1;
            loadData(page);
            $('.card').animateCss('flipInY');        

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
            $('.card').animateCss('flipInY');             
            
            $('#load-more-btn').show();
            if (page == 0) {
                $('#load-previous-btn').hide();
            }
        }
    });

    // Clears markers from Google Map

    $('#clear-map-btn').click(function() {
        setMapOnAll(null);
        markers = [];

    });





    // Function for pagination, loads 3 more results for each button click   
    // TODO:  Add logic to handle showing only one desc, date and name for small screens



    var loadData = function(p) {        
        clearResults();
        $('#displayDesc').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 0].description + '</p></br>').animateCss('fadeIn');
        $('#displayDesc2').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 1].description + '</p></br>').animateCss('fadeIn');
        $('#displayDesc3').append('<p>' + Data[0].vioDesc[(p * itemsPerPage) + 2].description + '</p></br>').animateCss('fadeIn');

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
        } else if ((zip) && (dba)) {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            query.zipcode = zip;
            byZipAndDba(zip, dbaUpper, query);
            $('#dba').val('');
        } else if ((zip) && (cuisine)) {
            query.zipcode = zip;
            byZipAndCuisine(zip, cuisine, query);
        } else if ((cuisine) && (dba)) {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            query.cuisine_description = cuisine;
            byCuisineAndDba(dbaUpper, cuisine, query);
        } else if (cuisine) {
            query.cuisine_description = cuisine;           
            byCuisine(cuisine, query);
        } else if (zip) {            
            query.zipcode = zip;
            byZip(zip, query);
        } else {
            var dbaUpper = dba.toUpperCase();
            query.dba = dbaUpper;
            byDba(dbaUpper, query);
            $('#dba').val('');
        }




    };



    // Clear the restaurant text results

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



    //  ******  Google Maps API Functions  ****** // 


    // Extract addresses from data and create string for Google Geocoder.  Push to
    // addresses array and then send to geocode 

    var displayPins = function(data) {
        var addresses = [];

        for (var i = 0; i < data.vioDesc.length; i++) {
            var streetAddress = data.vioDesc[i].building + ' ' + data.vioDesc[i].street + ' ' + 'New York, NY' + ' ' + data.vioDesc[i].zipcode;
            console.log(streetAddress);
            addresses.push(streetAddress);


        }
        addresses.forEach(function(element) {
            geocode(element);
            // Perhaps need a setTimeout as workaround to Google Maps API's query limits?
            // setTimeout(function(){

            // }, 1000)
        });
    }




    var geocode = function(element) {        
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            address: element

        }, function(results, status) {
            var pinsArray = [];
            if (status == google.maps.GeocoderStatus.OK) {                
                var myResult = results[0].geometry.location;
                createMarker(myResult);

                map.setCenter(results[0].geometry.location);
                map.setZoom(12);



            } else { // if status value is not equal to "google.maps.GeocoderStatus.OK"

                // warning message
                alert("The Geocode was not successful for the following reason: " + status);

            }


        });
    }


    // Create the actual marker on the Google map

    var createMarker = function(latlng) {
        // Remember to change calculation of Chances Rating to 
        // reflect number of results received (low results usually = high score)
        // However, if you can get Google Maps to work with unlimited results, not really a problem.

        var marker = new google.maps.Marker({
            map: map,
            position: latlng
        });
        markers.push(marker);       
        setMapOnAll(map);



    }

    var setMapOnAll = function(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


    // Display the received results to the user

    var displayResults = function(data) {

        $('#load-more-btn').show();
        $('#overallRating-h2').show();
        $('#vioDesc-h3').show();
        $('#inspDate-h3').show();
        $('#restName-h3').show();
        $('#displayScore').html('');
        $('#displayScoreMsg').html('');
        clearResults();
        Data = [];


        Data.push(data);
        totalPages = data.vioDesc.length / itemsPerPage;    




        // Sort the results by most recent inspection date

        var sortInspectionDate = function() {            
            data.vioDesc.sort(function(a, b) {
                if (a.inspection_date > b.inspection_date) {
                    return -1;
                }

                if (a.inspection_date < b.inspection_date) {
                    return 1;
                }

                return 0;
            });
            return data.vioDesc;


        }

        sortInspectionDate();

        $('.card').show().animateCss('lightSpeedIn');
        $('#displayScore').append('<p>' + data.chancesRating + '</p>').animateCss('slideInLeft');
        $('#displayScoreMsg').append('<p>Out of 10</p>' + '<p>0 = Best or No data</p>' + '<p>10 = Worst</p>').animateCss('slideInLeft');
        $('#displayScoreMsg').append('<a href="#" data-toggle="modal" data-target="#calc-modal" class="btn btn-default action-btn" id="calc-btn">How is this calculated?</a>').animateCss('slideInLeft');
        $('#displayDate').append('<p>' + moment(data.vioDesc[0].inspection_date).fromNow() + '</p>').animateCss('fadeIn');
        $('#displayDate2').append('<p>' + moment(data.vioDesc[1].inspection_date).fromNow() + '</p>').animateCss('fadeIn');
        $('#displayDate3').append('<p>' + moment(data.vioDesc[2].inspection_date).fromNow() + '</p>').animateCss('fadeIn');

        $('#displayDesc').append('<p>' + data.vioDesc[0].description + '</p>').animateCss('fadeIn');
        $('#displayDesc2').append('<p>' + data.vioDesc[1].description + '</p>').animateCss('fadeIn');
        $('#displayDesc3').append('<p>' + data.vioDesc[2].description + '</p>').animateCss('fadeIn');

        $('#displayName').append('<p>' + data.vioDesc[0].dba + '</p>').animateCss('fadeIn');
        $('#displayName2').append('<p>' + data.vioDesc[1].dba + '</p>').animateCss('fadeIn');
        $('#displayName3').append('<p>' + data.vioDesc[2].dba + '</p>').animateCss('fadeIn');


        // Call to function to place pins on Google Map
        displayPins(data);
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

    var byZipAndDba = function(zip, dba, query) {
        $.ajax('https://boiling-shelf-21235.herokuapp.com/zipdba/' + zip + '/' + dba, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byZipCuisineAndDba = function(zip, cuisine, dba, query) {
        $.ajax('https://boiling-shelf-21235.herokuapp.com/zipcuisinedba/' + dba + '/' + zip + '/' + cuisine, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byZipAndCuisine = function(zip, cuisine, query) {
        $.ajax('https://boiling-shelf-21235.herokuapp.com/zipcuisine/' + zip + '/' + cuisine, {
            type: 'GET',
            data: query,
            dataType: 'json'
        })

        .done(function(data) {
            displayResults(data);
        });
    };

    var byCuisineAndDba = function(dba, cuisine, query) {
        $.ajax('https://boiling-shelf-21235.herokuapp.com/cuisinedba/' + dba + '/' + cuisine, {
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
