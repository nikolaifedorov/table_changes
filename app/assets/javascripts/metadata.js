// This allows manipulate with arbitrary data associated with the specified element. 

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
