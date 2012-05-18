
module A
  module B
    HOGE = "HOGEHOGE"

    module_function

    def test2
      puts "TEST2"
    end

    module C
      def test
        puts HOGE
        A::B::test2
      end
    end


  end
end

include A::B::C
# include A::B
test

# include A::B
# test2
