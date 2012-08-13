// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {
  //if ($("#comments").length > 0) {
  //  setTimeout(updateComments, 10000);
  //}
  
    
  $("#container td").bind('click', function() {
    var div = $(this).find("div");
    var input = $(this).find("input");
    var val_div_input = $(div).text();
    $(div).hide();
    $(input).val(val_div_input);
    $(input).show();
    $(input).focus();
    var key_press = 0;
    $(input).bind("keydown", function (event) {
      key_press = key_press + 1;
      if (key_press == 3) {
        key_press = 0;
      }
    });
    
    
    $(input).bind('focusout', function() {
      var val_input_div = $(this).val();
      $(this).hide();
      $(div).text(val_input_div);
      $(div).show();
    });
    
    
  });
    
});

function updateComments () {
  var article_id = $("#article").attr("data-id");
  if ($(".comment").length > 0) {
    var after = $(".comment:last-child").attr("data-time");
  } else {
    var after = "0";
  }
  $.getScript("/comments.js?article_id=" + article_id + "&after=" + after)
  setTimeout(updateComments, 10000);
}
