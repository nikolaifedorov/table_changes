class CellText < ActiveRecord::Base
  attr_accessible :index, :text

  has_many :cell_histories

end
