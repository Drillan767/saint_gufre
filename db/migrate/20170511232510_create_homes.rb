class CreateHomes < ActiveRecord::Migration[5.1]
  def change
    create_table :homes do |t|
      t.string :label
      t.json :fichiers

      t.timestamps
    end
  end
end
