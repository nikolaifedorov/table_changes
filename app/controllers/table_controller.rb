class TableController < ApplicationController

  def index
    @columns = 5;
    @rows = 6;
    cell_texts = CellText.all
    @cell_index = cell_texts.group_by(&:index)
    @updated_at = cell_texts.map(&:updated_at).max
  end

end
