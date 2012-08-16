require 'faye'
require File.expand_path('../config/initializers/faye.rb', __FILE__)

Faye::WebSocket.load_adapter(FAYE_CONFIG['adapter'])
faye_server = Faye::RackAdapter.new(:mount => '/faye', :timeout => 45)
faye_server.listen(FAYE_CONFIG['port'])
run faye_server
