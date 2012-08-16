module ApplicationHelper

  def faye_server_name
    "http://#{FAYE_CONFIG['host']}:#{FAYE_CONFIG['port']}"
  end

end
