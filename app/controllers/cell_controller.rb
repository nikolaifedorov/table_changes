class CellController < ApplicationController

  def index
    cell_texts = CellText.where("updated_at > ?", Time.at(params[:after].to_i + 1))
    @cell_index = cell_texts.group_by(&:index)
    @cells =  @cell_index.keys
    @updated_at = cell_texts.map(&:updated_at).max
    @history_time_i = params[:after].to_i  
  end
  
  def change
    cell = params[:cell]
    index = cell[:id]
    text = cell[:text]
    cell_text = CellText.find_or_create_by_index!(index)
    cell_text.text = text
    cell_text.save!

    cell_history = params[:history].merge({cell_text_id: cell_text.id})
    cell_text = CellHistory.create!(cell_history)

    cell_texts = CellText.where("updated_at > ?", Time.at(params[:syn].to_i + 1))
    @cell_index = cell_texts.group_by(&:index)
    @cells =  @cell_index.keys
    @updated_at = cell_texts.map(&:updated_at).max
    @history_time_i = params[:syn].to_i  

  end
end
