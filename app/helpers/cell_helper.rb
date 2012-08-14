module CellHelper

  LETTER = 6

  def highlight_top()
    6
  end

  def highlight_left(start_c)
    (start_c * LETTER) + 4  
  end

  def highlight_width(start_c, end_c)
    return (end_c - start_c) * LETTER if (end_c > start_c)
    0
  end

  def highlight_height()
    17
  end

  def highlight_div(cell_edit)
    top = highlight_top()
    left = highlight_left(cell_edit.start)
    width = highlight_width(cell_edit.start, cell_edit.end)
    height = highlight_height()
    "<div class='highlight search-highlight' " +
    "style='left: #{left}px; top: #{top}px; width: #{width}px; height: #{height}px;'></div>"
  end

  def get_text_by_index(group, index)
    group[index][0].text
  end

  def get_text_histories(group, index, data_i)
    group[index][0].cell_histories.
      where("created_at > ?", Time.at(data_i + 1))
  end

end
