### RUNNING APPLICATION ###

1. Install ruby 1.9.3

2. Run bundle

    $ bundle install

3. Set database properties (see file config/database.yml).
   
4. Create database

    $ rake db:create

5. Run migrations

    $ rake db:migrate

6. Set the 'event server' properties (see file config/faye.yml).
   Set current ip address host for 'host' attribute. (Do not use 'localhost' and '127.0.0.1').

7. Run the 'event server'

    $ rackup faye.ru -E production

8. Run application

    $ rails server

9. Open url http://localhost:3000/
