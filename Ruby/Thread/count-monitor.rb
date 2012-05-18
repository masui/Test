require 'Monitor'
lock = Monitor.new
count = 0;
t1 = Thread.new do
  100000.times do
    lock.synchronize do
      count += 1
    end
  end
end
t2 = Thread.new do
  100000.times do
    lock.synchronize do
      count += 1
    end
  end
end
t1.join; t2.join
puts count

