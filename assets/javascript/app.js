  // Initial array of cartoons
  var cartoons = ["Looney Tunes",  "Betty Boop", "Felix the Cat", "The Jetsons", "Donald Duck", "The Simpsons", "The Regular Show" ];

    

  // displaycartoonInfo function re-renders the HTML to display the appropriate content
  function displaycartoonInfo() {

    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      cartoon + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    // Creates AJAX call for the specific cartoon button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      
      // Creates a div to hold the cartoon
      for (var i = 0; i < response.data.length; i++) {
        var results = response.data[i];
        var $cartoon = $("<div>");
        

        // Retrieves the Rating Data
        console.log("rated: ", results.rating);
        // Creates an element to have the rating displayed
        var $rated = $("<div>");
        // Displays the rating
        $rated.text("Rated: " + results.rating);
        $cartoon.append($rated);


        // Retrieves the image
        console.log("image: ", results.images.fixed_height.url);
        // Creates an element to hold the image
        var $gif = $("<img>");
        $gif.attr("src", results.images.fixed_height_still.url);
        $gif.addClass("gif");
        $gif.attr("data-state", "still");
        
        // Appends the image
        $cartoon.append($gif);





        // Puts the entire cartoon above the previous cartoons.
        $("#cartoons-view").prepend($cartoon);


       
      }
    });

  }

  // Function for displaying cartoon data
  function renderButtons() {

    // Deletes the cartoons prior to adding new cartoons
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of cartoons
    for (var i = 0; i < cartoons.length; i++) {

      // Then dynamicaly generates buttons for each cartoon in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of cartoon to our button
      a.addClass("cartoon");
      // Added a data-attribute
      a.attr("data-name", cartoons[i]);
      // Provided the initial button text
      a.text(cartoons[i]);
      // Added the button to the buttons-view div
      $("#buttons-view").append(a);
    }
  }


  $(".gif").on("click", function() {
  console.log("You clicked the image!");
  
    var state = $(this).attr("data-state");
    console.log(state);

    if (state === "still") {
        // update data-state attr to "animate"
        // update src to the data-animate attribute
        var animateGif = $(this).attr("data-animate");
        $(this).attr("src", animateGif);
        $(this).attr("data-state", "animate");
    } else {
        // update state to "still"
        // update src to the data-still attribute
        var stillGif = $(this).attr("data-still");
        $(this).attr("src", stillGif);
        $(this).attr("data-state", "still");
    }
  // =============================================

  // STEP THREE: Check if the variable state is equal to 'still',
  // then update the src attribute of this image to it's data-animate value,
  // and update the data-state attribute to 'animate'.

  // If state is equal to 'animate', then update the src attribute of this
  // image to it's data-still value and update the data-state attribute to 'still'
  // ============== FILL IN CODE HERE FOR STEP THREE =========================

  // CODE GOES HERE

  // ==============================================

  // STEP FOUR: open the file in the browser and click on the images.
  // Then click again to pause.
});


  // This function handles events where the add cartoon button is clicked
  $("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();

    // The cartoon from the textbox is then added to our array
    cartoons.push(cartoon);

    // Calling renderButtons which handles the processing of our cartoon array
    renderButtons();
  });

  // Adding click event listeners to all elements with a class of "cartoon"
  $(document).on("click", ".cartoon", displaycartoonInfo);

  // Calling the renderButtons function to display the intial buttons
  renderButtons();
