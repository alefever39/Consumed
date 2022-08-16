class RemoveMediaQuantityFromSeries < ActiveRecord::Migration[7.0]
  def change
    remove_column :series, :media_quantity, :integer
  end
end
