module CellHelper

  def broadcast(channel, &block)
    message = { channel: channel, data: capture(&block) }
    uri = URI.parse("#{faye_server_name}/faye")
    Net::HTTP.post_form(uri, :message => message.to_json)
  end


  def changes_json(name_cells, cells_index, date_i)
    data_json = []
    name_cells.each do |name_cell| 
      cell = {}
      cell[:text] = cells_index[name_cell][0].text
      cell[:changes] = []
      histories = cells_index[name_cell][0].cell_histories.later_created_at(date_i)
      histories.each do |edit|
        change = {}        
        if (edit.start < edit.end)          
          change[:start_cursor] = edit.start
          change[:end_cursor] = edit.end
          cell[:changes] << change
        end
      end
      cell[:changes].to_json
      cell[:name] = name_cell
      data_json << cell
    end
    data_json.to_json
  end

end
