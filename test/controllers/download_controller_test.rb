require 'test_helper'

class DownloadControllerTest < ActionDispatch::IntegrationTest
  test "should get zip" do
    get download_zip_url
    assert_response :success
  end

end
