// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  //if ($("#comments").length > 0) {
  //  setTimeout(updateComments, 10000);
  //}

  var old_text = "";
  var new_text = "";
  var key_press = 0;

  $("#container td input.text").bind("keydown", function (event) {
   key_press = key_press + 1;
   var index_start = $(this).caret().start
   if (key_press >= 3) {
    key_press = 0;
    
   }
  }); 

  $("#container td input.text").bind('focusin', function() {
    old_text = $(this).val();
    key_press = 0;
  });

  $("#container td input.text").bind('focusout', function() {
    new_text = $(this).val();
    key_press = 0;
    if( old_text != new_text) {
      updateText($(this));
    }
  });
 
    
});

function updateText (that) {
  var index = $(that).attr('id');
  var text = $.param(that);
  $.ajax({
    url: "cell/update_text",
    type: "post",
    data: "cell[id]=" + index + "&" + text
  });
}
