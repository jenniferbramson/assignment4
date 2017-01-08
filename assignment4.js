// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

var param = ['interests', 'programming', 'comics'];

(function() {
  // Magic!
  console.log('Keepin\'n it clean with an external script!');

  // See if search is being written in
  $('.flexsearch-input').on("input", function() {

    // Delete any old matches displayed
    $('#results').hide();
    $('li').remove();

    // Get data from the API
    value = (this.value).toLowerCase();
    if (value != "") {
      for (var i = 0; i < param.length; i++) {
        showMatches(i, value);
      }

    }
  });

})();


function showMatches(i, input_data) {

  var state = $.ajax({
    url: 'http://www.mattbowytz.com/simple_api.json?data=' + param[i],
    type: 'get',

    // Success checks that readyState is 4 (success) and status is 200 (success)
    success: function (result) {
      // Look for data that starts with the user's input in the search bar
      var returned = state.responseJSON.data;
      for (var j = 0; j < returned.length; j++) {
        var lc_data = returned[j].toLowerCase(); // lowercase data
        if (lc_data.startsWith(input_data)) {
          // Display by adding an li of class accordian to results
          $('#results').show();
          $('#results').append('<li class="accordian">' + lc_data + '</li>');
        }
      }
    }
  });

}


// Open clicked suggestion in new tab
// Need to add the .accordian as they are created, so do from body
$('body').on('click', '.accordian', function() {
  var text = $(event.target).text();
  window.open('https://www.google.com/#safe=active&q=' + text, '_blank');
});
