class AddExternalIdToMedia < ActiveRecord::Migration[7.0]
  def change
    add_column :media, :external_id, :string
  end
end
