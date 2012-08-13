class CellController < ApplicationController

  def index
    cell_texts = CellText.where("updated_at > ?", Time.at(params[:after].to_i + 1))
    @cell_index = cell_texts.group_by(&:index)
    @cells =  @cell_index.keys
    @updated_at = cell_texts.map(&:updated_at).max
  end
  
  def update_text
    cell = params['cell']
    index = cell[:id]
    text = cell[:text]
    cell_text = CellText.find_or_create_by_index!(index)
    cell_text.text = text
    cell_text.save!
  end
end
