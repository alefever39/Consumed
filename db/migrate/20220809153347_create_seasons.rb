class CreateSeasons < ActiveRecord::Migration[7.0]
  def change
    create_table :seasons do |t|
      t.string :title
      t.integer :number
      t.text :description
      t.integer :rating
      t.integer :media_quantity
      t.belongs_to :series, null: false, foreign_key: true

      t.timestamps
    end
  end
end
