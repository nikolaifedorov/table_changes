// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function() {

  var faye = new Faye.Client(sFayeUrl);
  faye.subscribe("/table/edit", function(data) {
    if (data) {
      data = $.parseJSON(data);      
      var letter = 8, top = 6, left_const = 3, height = 14;
      $("table").attr("data-time", data['data-time']);
      $.each($.parseJSON(data.data), function(index, rows) {
        $("input#" + rows['name']).val(rows['text']);
        $.each(rows['changes'], function(index, change) {
          var div_element = $("<div class='highlight search-highlight'>");
          var start_cursor = parseInt(change['start_cursor']);
          var end_cursor = parseInt(change['end_cursor']); 
          var d_l = start_cursor * letter + left_const;
          var d_w = (end_cursor - start_cursor) * letter;       
          div_element.css('left', d_l + 'px');
          div_element.css('top', top + 'px');
          div_element.css('width', d_w + 'px');
          div_element.css('height', height + 'px');
          div_element.delay(2000).hide(0, function() { $(this).remove(); });
          $("input#" + rows['name']).parent().
            find("div.highlight-pane").append(div_element);
        });
      });
    }
  });

  //setTimeout(updateText, 5000);

  var count_changes = 0;
  var timeout_id_wait_changes; 


  $("#container td input.text").live({
  
    keyup: function (event) {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setNewText();  

      $(that).parent().find('div.highlight-pane > div').remove();

      cancelTimer();
      timeout_id_wait_changes = setTimeout(function() { changesText(that); }, 500);

      if(metaData.getNewText() == metaData.getOldText()) {
        cancelTimer();  
      }

      var code = event.keyCode ? event.keyCode : event.charCode;
      
      var del_code = [8, 46];
      var arrow_code = [37, 38, 39, 40];

      if ($.inArray(code, $.merge(del_code, arrow_code)) > -1 )  {
        metaData.setStartCursor();
        metaData.setEndCursor();
      }

      var text = $(that).val();
      var s = $(that).caret().end;

      var beforeCaret = text.substring(0, s).replace(/ /g, '\xa0') || '\xa0';
      var afterCaret = text.substring(s).replace(/ /g, '\xa0') || '\xa0';

      if ($.inArray(code, arrow_code) == -1) {
        metaData.setEndCursor();

        if(metaData.getNewText() != metaData.getOldText()) {
          count_changes = count_changes + 1;
        }

        if (count_changes >= 3) {
          changesText(that);
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
      metaData.setStartCursor();

      count_changes = 0;
      changesText(that);
    },

    mouseup: function() {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setStartCursor();
    }
 
  });

  function cancelTimer(timeout_id) {
    var timer_id = timeout_id || timeout_id_wait_changes
    if (timer_id) {
      clearTimeout(timer_id);
    }
  }

  function changesText (that) { 
    cancelTimer();
    count_changes = 0;
    var cell_index = $(that).attr('id');
    var param_text = $.param($(that));
    var after = $("table").attr("data-time");

    var metaData = new MetaData(that);
    var index_start = metaData.getStartCursor(); 
    var index_end = metaData.getEndCursor();
    
    if(metaData.getNewText() != metaData.getOldText()) {
      $.ajax({
        url: sChangesTextAjaxUrl,
        type: "post",
        data: "cell[id]=" + cell_index + "&" + param_text + "&history[start]=" + index_start + "&history[end]=" + index_end + "&syn=" + after
      });
    }
    metaData.setStartCursor();
  }

  function updateText () {
    var after = $("table").attr("data-time");
    //$.getScript(sUpdateTextAjaxUrl +"?after=" + after);
    $.getJSON(sUpdateTextJsonUrl, "after=" + after, function(data) {
      if (data) {      
        var letter = 8, top = 6, left_const = 3, height = 14;
        $("table").attr("data-time", data['data-time']);
        $.each(data.data, function(index, rows) {
          $("input#" + rows['name']).val(rows['text']);
          $.each(rows['changes'], function(index, change) {
            var div_element = $("<div class='highlight search-highlight'>");
            var start_cursor = parseInt(change['start_cursor']);
            var end_cursor = parseInt(change['end_cursor']); 
            var d_l = start_cursor * letter + left_const;
            var d_w = (end_cursor - start_cursor) * letter;       
            div_element.css('left', d_l + 'px');
            div_element.css('top', top + 'px');
            div_element.css('width', d_w + 'px');
            div_element.css('height', height + 'px');
            div_element.delay(2000).hide(0, function() { $(this).remove(); });
            $("input#" + rows['name']).parent().
              find("div.highlight-pane").append(div_element);
          });
        });
      }
    });
    //setTimeout(updateText, 5000);
  }
   
});


