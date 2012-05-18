# -*- coding: utf-8 -*-
require 'rubygems'
require 'aws/s3'
include AWS::S3

Base.establish_connection!(
  :access_key_id => 'ABCDEFG',
  :secret_access_key => 'abcdefg'
)

DEFAULT_HOST.replace "s3-ap-northeast-1.amazonaws.com" # 東京を指定

# buckets = Service.buckets

b = Bucket.find('backup.pitecan.com')

b.each { |obj|
  p obj
}


