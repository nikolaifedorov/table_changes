require 'test_helper'

class CellControllerTest < ActionController::TestCase
  test "should get update_text" do
    get :update_text
    assert_response :success
  end

end
