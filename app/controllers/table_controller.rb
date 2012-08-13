class TableController < ApplicationController

  def index
    @columns = 5;
    @rows = 6;
    @cell_index = CellText.all.group_by(&:index)
  end

end
