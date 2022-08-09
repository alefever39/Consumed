class CreateMedia < ActiveRecord::Migration[7.0]
  def change
    create_table :media do |t|
      t.string :title
      t.string :release_date
      t.text :description
      t.integer :global_rating
      t.string :publisher
      t.belongs_to :media_type, null: false, foreign_key: true
      t.string :genre

      t.timestamps
    end
  end
end
