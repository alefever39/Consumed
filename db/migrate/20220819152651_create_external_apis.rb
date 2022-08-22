class CreateExternalApis < ActiveRecord::Migration[7.0]
  def change
    create_table :external_apis do |t|
      t.string :title
      t.string :title_id
      t.text :response
      t.string :api

      t.timestamps
    end
  end
end
