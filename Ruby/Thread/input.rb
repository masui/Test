# -*- coding: utf-8 -*-

count = 0
t1 = Thread.new do
  loop do
    count += 1
  end
end

t2 = Thread.new do
  loop do
    a = gets
    puts "#{count} #{a}"
    t1.kill
    break
  end
end

t1.join
t2.join

puts "aaaa"


