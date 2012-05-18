package{
    import flash.display.*;
    import flash.text.*;
    import flash.net.XMLSocket;
    import flash.events.Event;
    import flash.events.DataEvent;
    import flash.events.MouseEvent;

    [SWF(width='500', height='530', backgroundColor='0xd5c8ff', framerate='30')]

    public class Test extends Sprite{
	private static var socket:XMLSocket;
	private static var tf:TextField = new TextField();

	public function Test(){

	    socket = new XMLSocket();
	    socket.addEventListener(DataEvent.DATA, onData);
	    socket.addEventListener(Event.CONNECT, onConnect);
	    //socket.addEventListener(IOErrorEvent.IO_ERROR, onIOError);
	    //socket.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onSecurityError);
	    socket.connect('hondana.org', 3939);

	    var format:TextFormat = new TextFormat();
            format.font = "Verdana";
            format.color = 0xFF0000;
            format.size = 24;
            //format.underline = true;
            tf.defaultTextFormat = format;

	    tf.text = "漢字!";
	    addChild(tf);

            addEventListener(Event.ENTER_FRAME, draw);
            stage.addEventListener(MouseEvent.MOUSE_DOWN, mousePressed);
            stage.addEventListener(MouseEvent.MOUSE_MOVE, mouseDragged);
            stage.addEventListener(MouseEvent.MOUSE_UP, mouseReleased);

            graphics.lineStyle(1, 0x000000);
	}

	public static function onData(event:DataEvent):void
	{
	    trace(event.data);
	    tf.text = event.data;
	    trace('ondata');
	}

	public static function onConnect(event:Event):void
	{
	    trace('onconnect');
	}

	private function draw(e:Event):void {
	    display();
	}
	
	private function display():void {
	    graphics.beginFill(0x00ffff);
	    graphics.moveTo(10,10);
	    graphics.lineTo(mouseX, mouseY);
	    graphics.endFill();
	}
	
	private function mousePressed(e:MouseEvent):void {
	    display();
	    trace('mousePressed');
	    socket.send("abc\n");
	}
	private function mouseReleased(e:MouseEvent):void {
	    display();
	}
	private function mouseDragged(e:MouseEvent):void {
	    tf.x = mouseX;
	    tf.y = mouseY;
	    
	    display();
	}
    }
}

