# -*- coding: utf-8 -*-
require 'rubygems'
require 'aws/s3'
include AWS::S3

#S3と接続
Base.establish_connection!(
  :access_key_id => 'AKIAJGLOWXLCOFGJGJPQ',
  :secret_access_key => 't2c1JoBk5y+H9mFAfPysFGUWdFgOzGvV5AvhuYng'
)

DEFAULT_HOST.replace "s3-ap-northeast-1.amazonaws.com" # 東京を指定しなければならない

buckets = Service.buckets

b = Bucket.find('backup.pitecan.com')
puts b
exit

b = buckets[0]

p b

b.each { |obj|
  p obj
}


#Bucket.objects('backup.pitecan.com').each do |obj|
#  puts obj.key
#end


