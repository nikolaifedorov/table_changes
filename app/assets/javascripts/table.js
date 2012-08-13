// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  setTimeout(updateText, 10000);

  var old_text = "";
  var new_text = "";
  var count_changes = 0;
  var timeout_id_wait_changes; 


  $("#container td input.text").bind("keyup", function (event) {
    var that = this;  
  
    if (timeout_id_wait_changes) {
      clearTimeout(timeout_id_wait_changes);
    }
    timeout_id_wait_changes = setTimeout(function() { changesText(that); }, 8000);

    count_changes = count_changes + 1;
    //var index_start = $(that).caret().start
    if (count_changes >= 3) {
      changesText(that);
    }
  }); 

  $("#container td input.text").bind('focusin', function() {
    old_text = $(this).val();
    count_changes = 0;
  });

  $("#container td input.text").bind('focusout', function() {
    var that = this;    
    new_text = $(that).val();
    count_changes = 0;
    if( old_text != new_text) {
      changesText(that);
    }
  });
 
    
});

function changesText (that) { 
  count_changes = 0;
  var index = $(that).attr('id');
  var param_text = $.param($(that));

  $.ajax({
    url: sChangesTextAjaxUrl,
    type: "post",
    data: "cell[id]=" + index + "&" + param_text
  });
}

function updateText () {
  var after = $("table").attr("data-time");
  $.getScript(sUpdateTextAjaxUrl +"?after=" + after);
  setTimeout(updateText, 10000);
}
