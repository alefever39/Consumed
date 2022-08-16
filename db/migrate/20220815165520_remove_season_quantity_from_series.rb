class RemoveSeasonQuantityFromSeries < ActiveRecord::Migration[7.0]
  def change
    remove_column :series, :season_quantity, :integer
  end
end
