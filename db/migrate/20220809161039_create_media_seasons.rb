class CreateMediaSeasons < ActiveRecord::Migration[7.0]
  def change
    create_table :media_seasons do |t|
      t.integer :number
      t.belongs_to :season, null: false, foreign_key: true
      t.belongs_to :medium, null: false, foreign_key: true

      t.timestamps
    end
  end
end
