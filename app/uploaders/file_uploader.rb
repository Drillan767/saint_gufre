class FileUploader < CarrierWave::Uploader::Base

  storage :file

  def store_dir
    'uploads/files'
  end

end
