class CreateSeries < ActiveRecord::Migration[7.0]
  def change
    create_table :series do |t|
      t.string :title
      t.integer :rating
      t.integer :media_quantity
      t.integer :season_quantity

      t.timestamps
    end
  end
end
