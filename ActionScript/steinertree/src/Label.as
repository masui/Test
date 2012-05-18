package {
    import flash.text.TextField;
    import flash.text.TextFieldAutoSize;
    import flash.text.TextFormat;

    public class Label extends TextField {

        public function Label(s:String) {
            autoSize = TextFieldAutoSize.LEFT;
            var fmt:TextFormat = new TextFormat();
            fmt.font = "Verdana";
            defaultTextFormat = fmt;
            text = s;
        }
    }
}
