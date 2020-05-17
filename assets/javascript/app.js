
var topics = ["dog", "cat", "rabbit", "hamster", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken"];

$(document).on("click", ".topic", function() {
    // In this case, the "this" keyword refers to the button that was clicked
    var searchTerm = $(this).attr("data-name");

    // Constructing a URL to search Giphy
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    searchTerm + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // Performing our AJAX GET request
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
        console.log(queryURL);

        console.log(response);

        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div for the gif
                var gifDiv = $("<div class=gif>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var topicImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the
                // Giving image tag still and animated properties and seting state to still
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-state", "still");

                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                gifDiv.append(topicImage);
                gifDiv.append(p);
                gifDiv.addClass("gif");

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-here").prepend(gifDiv);
            }
        }
    
        $(document).on("click", ".gif", function() {
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
    
    });

    $(document).on("click", ".gif", function() {
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
});

function renderButtons() {

    // Deleting the buttons prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-go-here").empty();

    // Looping through the array of movies
    for (var i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie to our button
        a.addClass("topic");
    
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-go-here").append(a);
    }
}

$("#add-topic").on("click", function() {
    event.preventDefault();

    var animal = $("#topic-input").val().trim();
    // animal.data-search = $("#animal-input").val().trim();
    topics.push(animal);
    console.log(animals);

    renderButtons();
});

renderButtons();

$(document).on("click", ".gif", function() {
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