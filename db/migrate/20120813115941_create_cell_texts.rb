class CreateCellTexts < ActiveRecord::Migration
  def up
    create_table :cell_texts do |t|
      t.string :index
      t.text :text
      t.timestamps
    end
  end

  def down
    sql <<-SQL
      drop table cell_texts;
    SQL
  end

end
