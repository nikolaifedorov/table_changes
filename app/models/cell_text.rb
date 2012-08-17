class CellText < ActiveRecord::Base
  attr_accessible :index, :text

  has_many :cell_histories

  scope :later_updated_at, lambda { |date_i|
      where("updated_at > ?", Time.at(date_i + 1))
  }

end
