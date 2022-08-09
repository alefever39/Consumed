class CreateMediaUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :media_users do |t|
      t.integer :rating
      t.text :review
      t.string :site_consumed
      t.string :consumed
      t.text :notes
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :medium, null: false, foreign_key: true

      t.timestamps
    end
  end
end
