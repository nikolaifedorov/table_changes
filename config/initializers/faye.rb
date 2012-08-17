require 'yaml'

CUR_ENV = ENV['RACK_ENV'] ? ENV['RACK_ENV'] : ENV['RAILS_ENV']

FAYE_CONFIG = YAML::load(File.open('config/faye.yml'))[CUR_ENV]

