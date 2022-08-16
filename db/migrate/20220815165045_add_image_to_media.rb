class AddImageToMedia < ActiveRecord::Migration[7.0]
  def change
    add_column :media, :image, :string
  end
end
