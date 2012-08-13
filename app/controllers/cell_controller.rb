class CellController < ApplicationController
  def update_text
    cell = params['cell']
    index = cell[:id]
    text = cell[:text]
    cell_text = CellText.find_or_create_by_index!(index)
    cell_text.text = text
    cell_text.save!
  end
end
