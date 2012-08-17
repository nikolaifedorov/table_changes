class CreateCellHistories < ActiveRecord::Migration

  def up
    create_table :cell_histories do |t|
      t.integer :start
      t.integer :end
      t.references :cell_text
      t.timestamps
    end
    #add a foreign key
    execute <<-SQL
      ALTER TABLE cell_histories
        ADD CONSTRAINT fk_cell_histories_cell_texts
        FOREIGN KEY (cell_text_id)
        REFERENCES cell_texts(id)
    SQL
  end
   
  def down
    execute <<-SQL
      ALTER TABLE cell_histories
        DROP CONSTRAINT fk_cell_histories_cell_texts
    SQL
    drop_table :cell_histories
  end

end
