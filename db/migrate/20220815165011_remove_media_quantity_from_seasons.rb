class RemoveMediaQuantityFromSeasons < ActiveRecord::Migration[7.0]
  def change
    remove_column :seasons, :media_quantity, :integer
  end
end
