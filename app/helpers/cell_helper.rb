module CellHelper

  LETTER = 8

  def highlight_top()
    6
  end

  def highlight_left(start_c)
    (start_c * LETTER) + 3  
  end

  def highlight_width(start_c, end_c)
    return (end_c - start_c) * LETTER if (end_c > start_c)
    0
  end

  def highlight_height()
    14
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

  def get_text_histories(group, index, time_i)
    group[index][0].cell_histories.
      where("created_at > ?", Time.at(time_i + 1))
  end

  def changes_json(name_cells, cells_index, date_i)
    data_json = []
    name_cells.each do |name_cell| 
      cell = {}
      cell[:text] = get_text_by_index(cells_index, name_cell)
      cell[:changes] = [] 
      get_text_histories(cells_index, name_cell, date_i).each do |edit|
        change = {}        
        change[:start_cursor] = edit.start
        change[:end_cursor] = edit.end
        cell[:changes] << change
      end
      cell[:changes].to_json
      cell[:name] = name_cell
      data_json << cell
    end
    data_json.to_json
  end
end
