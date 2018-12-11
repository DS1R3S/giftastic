// VARIABLES
var searchButtons = [];
var searchTerm = '';
var apiKey = 'api_key=' + '9GBZaJDhdxiQAnCyGtR1Ia6VuHXcMSkF';
var urlBase = 'https://api.giphy.com/v1/gifs/search?' + apiKey;
https://api.giphy.com/v1/gifs/search?api_key=&q=drake

// -------------------------------------------------------------
// FUNCTIONS
// function for creating buttons
function buttonMaker() {
    $("#button-area").empty();

    for (var i = 0; i < searchButtons.length; i++) {

        var button = $('<button>')
        button.attr('date-name', searchButtons[i]);
        button.attr('class', 'btn btn-light new-search-button');
        button.text(searchButtons[i]);
        $('#button-area').append(button);

    }
}

// function for adding gifs to the search results div
function displayGif() {
    var gifTag = $(this).attr('date-name');
    var queryUrl = 'https://api.giphy.com/v1/gifs/search?' + apiKey + '&q=' + gifTag + '&limit=10&offset=0&rating=G&lang=en';

    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function (response) {
        console.log(queryUrl);
        console.log(response)
        var results = response.data

        for (var i = 0; i < results.length; i++) {
            var gifHolder = $("<div class='gif'>");
            var rating = results[i].rating;
            // console.log(rating);
            var p = $("<p>").text("Rating: " + rating);
            var gifImg = $("<img>");
            gifImg.attr("src", results[i].images.fixed_height.url);
            gifImg.attr("data-animate", results[i].images.fixed_height.url);
            gifImg.attr("data-still", results[i].images.fixed_height_still.url);
            gifImg.attr("data-state", "still");
            gifImg.addClass('gif');
            gifHolder.prepend(p);
            gifHolder.append(gifImg);

            $("#card-section").prepend(gifHolder);
        }
    })
}


// -------------------------------------------------------------
// MAIN PROCESSES

// Create a button for every search term
$('#search-button').on('click', function (event) {
    event.preventDefault();

    searchTerm = $("#search-box").val().trim();
    searchButtons.push(searchTerm);
    console.log(searchTerm)
    buttonMaker();
    // method to empty the search text every time the search button
    $('#search-box').val('');

});
// When the new button is clicked, it will populate the page with gifs
$(document).on('click', ".new-search-button", displayGif);

$(document).on("click", '.gif', function () {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
// -------------------------------------------------------------
// 1. Use search criteria to find gifs 
// 2. Create a button with click of search button
// 3. When button is clicked, div populates with gifs

