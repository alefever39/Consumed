class AddSeasonExistsToSeasons < ActiveRecord::Migration[7.0]
  def change
    add_column :seasons, :season_exists, :boolean
  end
end
