class CreateMediaCreators < ActiveRecord::Migration[7.0]
  def change
    create_table :media_creators do |t|
      t.belongs_to :medium, null: false, foreign_key: true
      t.belongs_to :creator, null: false, foreign_key: true

      t.timestamps
    end
  end
end
