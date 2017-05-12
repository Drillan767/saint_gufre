class FileDetail < ApplicationRecord
  validates_uniqueness_of :path
end
