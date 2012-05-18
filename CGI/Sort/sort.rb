class SortLines
  def initialize(file)
    @file = file
    @lines = File.open(@file).readlines
  end

  attr_reader :lines

  def save
    File.open(@file,"w"){ |f|
      f.print lines
    }
  end

  # n�s�ڂ�1�s�J��グ
  def up(n)
    if n > 0 && n < lines.length then
      tmp = lines[n]
      lines[n] = lines[n-1]
      lines[n-1] = tmp
    end
    save
  end

  # n�s�ڂ��g�b�v�Ɉړ�
  def top(n)
    if n > 0 && n < lines.length then
      tmp = lines[n]
      (0..n-1).each { |i|
        lines[n-i] = lines[n-i-1]
      }
      lines[0] = tmp
    end
    save
  end
end

if nil then
  s = SortLines.new("text")
  s.top(9)
  print s.lines
end
