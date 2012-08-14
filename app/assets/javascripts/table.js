// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  //setTimeout(updateText, 5000);

  var count_changes = 0;
  var timeout_id_wait_changes; 


  $("#container td input.text").live({
  
    keyup: function (event) {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setNewText();  

      if (timeout_id_wait_changes) {
        clearTimeout(timeout_id_wait_changes);
      }
      timeout_id_wait_changes = setTimeout(function() { changesText(that); }, 500);

      var code = event.keyCode ? event.keyCode : event.charCode;
      
      var del_code = [8, 37]
      var arrow_code = [38, 39, 40, 46];

      if ($.inArray(code, $.merge([], del_code)) > -1 )  {
        metaData.setStartCursor();
        metaData.setEndCursor();
      }

      var text = $(that).val();
      var s = $(that).caret().end;

      var beforeCaret = text.substring(0, s).replace(/ /g, '\xa0') || '\xa0';
      var afterCaret = text.substring(s).replace(/ /g, '\xa0') || '\xa0';

      if ($.inArray(code, arrow_code) == -1) {
        metaData.setEndCursor();
        count_changes = count_changes + 1;

        if (count_changes >= 3) {
          changesText(that);
          metaData.setStartCursor();
        }
      } 

    },

    focusin: function() {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setOldText();

      count_changes = 0;
    },

    focusout: function() {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setNewText();

      count_changes = 0;
    },

    change: function() {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setNewText(); 

      count_changes = 0;
      changesText(that);
    },

    mouseup: function() {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setStartCursor();
    }
 
  });

function changesText (that) { 
  if (timeout_id_wait_changes) {
    clearTimeout(timeout_id_wait_changes);
  }
  count_changes = 0;
  var cell_index = $(that).attr('id');
  var param_text = $.param($(that));
  var after = $("table").attr("data-time");

  var metaData = new MetaData(that);
  var index_start = metaData.getStartCursor(); 
  var index_end = metaData.getEndCursor();

  $.ajax({
    url: sChangesTextAjaxUrl,
    type: "post",
    data: "cell[id]=" + cell_index + "&" + param_text + "&history[start]=" + index_start + "&history[end]=" + index_end + "&syn=" + after
  });
}

function updateText () {
  var after = $("table").attr("data-time");
  $.getScript(sUpdateTextAjaxUrl +"?after=" + after);
  //setTimeout(updateText, 5000);
}
   
});

function MetaData(that) {
  this.that = that;
  this.meta_new_text = 'new_text';
  this.meta_old_text = 'old_text';
  this.meta_start_cursor = 'start_cursor';
  this.meta_end_cursor = 'end_cursor';  

  this.setNewText = function() {
    $(this.that).data(this.meta_new_text, $(this.that).val());
  }
  
  this.getNewText = function() {
    return $(this.that).data(this.meta_new_text);
  }

  this.setOldText = function() {
    $(this.that).data(this.meta_old_text, $(this.that).val());
  }
  
  this.getOldText = function() {
    return $(this.that).data(this.meta_old_text);
  }

  this.setStartCursor = function() {
    $(this.that).data(this.meta_start_cursor, $(this.that).caret().start);
  }
  
  this.getStartCursor = function() {
    return $(this.that).data(this.meta_start_cursor);
  }

  this.setEndCursor = function() {
    $(this.that).data(this.meta_end_cursor, $(this.that).caret().end);
  }
  
  this.getEndCursor = function() {
    return $(this.that).data(this.meta_end_cursor);
  }
}

