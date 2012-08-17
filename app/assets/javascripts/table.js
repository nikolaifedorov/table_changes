
$(function() {

  var faye = new Faye.Client(sFayeUrl);
  faye.subscribe("/table/edit", function(data) {
    if (data) {
      data = $.parseJSON(data);      
      var letter = 8, height = 14;
      $("table").attr("data-time", data['data-time']);
      $.each($.parseJSON(data.data), function(index, rows) {

        var input_elem = $("input#" + rows['name']);
        var metaData = new MetaData(input_elem);
        metaData.setOldText();        
        if (metaData.getNewText() != rows['text']) { 
          $(input_elem).val(rows['text']);
          metaData.setNewText();
          metaData.setStartCursor();
          $(input_elem).parent().find('div.highlight-pane > div').remove();  

          $.each(rows['changes'], function(index, change) {
            // Calculate indent from left and top.          
            // indent for input field (input - html element)          
            var margin = input_elem.margin()
            var padding = input_elem.padding()
            var border = input_elem.border();
            var top = border.top + margin.top + padding.top;
            var left = margin.left + padding.left + border.left;
            // indent for cell (td - html element)          
            var td_elem = $(input_elem).parent();
            padding = td_elem.padding()
            top = top + padding.top;
            left = left + padding.left;
            // create highlight
            var div_element = $("<div class='highlight edit-highlight'>");
            var start_cursor = parseInt(change['start_cursor']);
            var end_cursor = parseInt(change['end_cursor']); 
            var d_l = (start_cursor * letter) + left;
            var d_w = (end_cursor - start_cursor) * letter;       
            div_element.css('left', d_l + 'px');
            div_element.css('top', top + 'px');
            div_element.css('width', d_w + 'px');
            div_element.css('height', height + 'px');
            div_element.delay(2000).hide(0, function() { $(this).remove(); });
            $(input_elem).parent().
              find("div.highlight-pane").append(div_element);
          });
        }

      });
    }
  });
  
  // Number the user changes, which we should send.
  var block_changes_for_send = 3;
  // count for user changes.
  var count_changes = 0;
  // store last timer id.  
  var timeout_id_wait_changes; 

  $("#container td input.text").live({
  
    keyup: function (event) {
      var that = this;
      var metaData = new MetaData(that);
      metaData.setNewText();  

      $(that).parent().find('div.highlight-pane > div').remove();

      var is_text_change = (metaData.getNewText() != metaData.getOldText());

      cancelTimer();
      if(metaData.getNewText() != metaData.getOldText()) {
        timeout_id_wait_changes = setTimeout(function() { changesText(that); }, 500);
      }

      var code = event.keyCode ? event.keyCode : event.charCode;
      
      var del_code = [8, 46];
      var arrow_code = [37, 38, 39, 40];

      // if text do not change but user presses the key.
      if (($.inArray(code, $.merge(del_code, arrow_code)) > -1) && !is_text_change)  {
        metaData.setStartCursor();
        metaData.setEndCursor();
      }

      // change (next) arrow
      if ($.inArray(code, arrow_code) > -1) {
        if(is_text_change) {
          changesText(that);
        }
      }

      if ($.inArray(code, arrow_code) == -1) {
        metaData.setEndCursor();

        if(is_text_change) {
          count_changes = count_changes + 1;
        }

        if (count_changes >= block_changes_for_send) {
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
    },

    mouseleave: function() {
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
   
});


