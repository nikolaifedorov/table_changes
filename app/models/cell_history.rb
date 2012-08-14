class CellHistory < ActiveRecord::Base
  attr_accessible :start, :end, :cell_text_id

  belongs_to :cell_text

end
