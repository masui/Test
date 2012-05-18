package {
    public function random(...args):Number {
        switch (args.length) {
        case 2:
            var min:Number = args[0];
            var max:Number = args[1];
            return Math.random() * (max - min) - min;
        case 1:
            return Math.random() * Number(args[0]);
        }
        return Math.random();
    }
}
