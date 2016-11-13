


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
    
    
    /* Float Label Pattern Plugin for Bootstrap 3.1.0 by Travis Wilson
**************************************************/


    // $.fn.floatLabels = function (options) {

    //     // Settings
    //     var self = this;
    //     var settings = $.extend({}, options);


    //     // Event Handlers
    //     function registerEventHandlers() {
    //         self.on('input keyup change', 'input, textarea', function () {
    //             actions.swapLabels(this);
    //         });
    //     }


    //     // Actions
    //     var actions = {
    //         initialize: function() {
    //             self.each(function () {
    //                 var $this = $(this);
    //                 var $label = $this.children('label');
    //                 var $field = $this.find('input,textarea').first();

    //                 if ($this.children().first().is('label')) {
    //                     $this.children().first().remove();
    //                     $this.append($label);
    //                 }

    //                 var placeholderText = ($field.attr('placeholder') && $field.attr('placeholder') != $label.text()) ? $field.attr('placeholder') : $label.text();

    //                 $label.data('placeholder-text', placeholderText);
    //                 $label.data('original-text', $label.text());

    //                 if ($field.val() == '') {
    //                     $field.addClass('empty')
    //                 }
    //             });
    //         },
    //         swapLabels: function (field) {
    //             var $field = $(field);
    //             var $label = $(field).siblings('label').first();
    //             var isEmpty = Boolean($field.val());

    //             if (isEmpty) {
    //                 $field.removeClass('empty');
    //                 $label.text($label.data('original-text'));
    //             }
    //             else {
    //                 $field.addClass('empty');
    //                 $label.text($label.data('placeholder-text'));
    //             }
    //         }
    //     }


    //     // Initialization
    //     function init() {
    //         registerEventHandlers();

    //         actions.initialize();
    //         self.each(function () {
    //             actions.swapLabels($(this).find('input,textarea').first());
    //         });
    //     }
    //     init();


    //     return this;
    // };



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

var getInput = function(){
    var query = {};
    console.log(query);
    
    var cuisine = $('#cuisine').val();
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




