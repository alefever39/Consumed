class CreateMediaTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :media_types do |t|
      t.string :media_type

      t.timestamps
    end
  end
end
