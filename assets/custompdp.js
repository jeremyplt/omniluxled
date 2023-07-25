$(document).ready(function() {
  $(".toggleingredients").click(function(event) {
    event.preventDefault();
    var target = $(this).data("target");
    $("#" + target).toggle("fast"); // Adjust the speed by changing "slow" to a specific duration, e.g., "2000" for 2 seconds
    $(this).text(function(_, text) {
      return text === "+ View all ingredients" ? "- View all ingredients" : "+ View all ingredients";
    });
  });
});