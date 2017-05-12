class Home < ApplicationRecord
  mount_uploaders :fichiers, FileUploader
end
