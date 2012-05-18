require 'rubygems'
require_gem 'activerecord'

ActiveRecord::Base.establish_connection(
  :adapter => 'sqlite3',
  :dbfile => 'test.db'
)

class Bookinfo < ActiveRecord::Base
end

puts "--------1----------"
bookinfo = Bookinfo.new
puts "--------2----------"
bookinfo.title = "Book title"
puts "--------3----------"

# bookinfo.id = 101
bookinfo.isbn = '12345'
bookinfo.title = 'book title'
bookinfo.publisher = 'ASCII'
bookinfo.authors = 'masui'
bookinfo.price = 3000
bookinfo.imageurl = 'http://'

puts bookinfo.title
bookinfo.save

