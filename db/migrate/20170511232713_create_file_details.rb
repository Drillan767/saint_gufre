class CreateFileDetails < ActiveRecord::Migration[5.1]
  def change
    create_table :file_details do |t|
      t.string :path
      t.string :tags

      t.timestamps
    end
  end
end
