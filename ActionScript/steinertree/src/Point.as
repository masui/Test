package {

    public class Point {
        public var x:Number;
        public var y:Number;

        /** int[]  */
        public var link:Array;

        public function Point(xx:Number, yy:Number) {
            this.x = xx;
            this.y = yy;
            this.link = new Array(3); // int[3];
        }
    }
}
