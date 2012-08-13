// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  setTimeout(updateText, 10000);

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
      changesText($(this));
    }
  });
 
    
});

function changesText (that) {
  var index = $(that).attr('id');
  var text = $.param(that);

  $.ajax({
    url: sChangesTextAjaxUrl,
    type: "post",
    data: "cell[id]=" + index + "&" + text
  });
}

function updateText () {
  var after = $("table").attr("data-time");
  $.getScript(sUpdateTextAjaxUrl +"?after=" + after);
  setTimeout(updateText, 10000);
}
