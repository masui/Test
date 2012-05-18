# -*- coding: utf-8 -*-
count = 0;
t1 = Thread.new do
  100000.times do
    count += 1
  end
end
t2 = Thread.new do
  100000.times do
    count += 1
  end
end
t1.join; t2.join
puts count
