class CellHistory < ActiveRecord::Base
  attr_accessible :start, :end, :cell_text_id

  belongs_to :cell_text

  scope :later_created_at, lambda { |date_i|
      where("created_at > ?", Time.at(date_i + 1)) 
  }

end
