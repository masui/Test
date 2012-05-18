package {
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.MouseEvent;

    /** Steiner Tree
     * http://en.wikipedia.org/wiki/Steiner_tree
     */
    [SWF(width='500', height='530', backgroundColor='0xd5c8ff', framerate='30')]
    public class Steinertree extends Sprite {

        private const WINWIDTH:int = 500;
        private const WINHEIGHT:int = 500;
        private const CONTROLHEIGHT:int = 30;

        /** Point[] */
        private var points:Array;
        private var npoints:int;
        private var selind:int;
        private var ndots:int = 7;
        private var control:Boolean = false;

        private var label:Label = new Label("");
        private var fillColor:uint;

        /**
         */
        public function Steinertree() {
            addChild(label);
            setup();
            addEventListener(Event.ENTER_FRAME, draw);
            stage.addEventListener(MouseEvent.MOUSE_DOWN, mousePressed);
            stage.addEventListener(MouseEvent.MOUSE_MOVE, mouseDragged);
            stage.addEventListener(MouseEvent.MOUSE_UP, mouseReleased);
        }

        private function setup():void {
            points = new Array(1000); // new Point[1000];
            initialize(ndots);
        }

        private function initialize(n:int):void {
            for (npoints = 0; npoints < n; npoints++) {
                points[npoints] = new Point(random(500), random(500));
            }
            for (var i:int = 0; i < npoints-2; i++) {
                var p:Point = new Point(random(500), random(500));
                points[npoints+i] = p;
                p.link[0] = (i == 0 ? 0 : i+1);
                p.link[1] = (i == 0 ? 1 : npoints+i-1);
                p.link[2] = (i == npoints-3 ? npoints-1 : npoints+i+1);
            }
        }

        private function draw(e:Event):void {
            display();
            movepoint();
            reconnect();
        }

        private function background(r:int, g:int, b:int):void {
            graphics.clear();
            graphics.lineStyle(1, 0x000000);
        }

        private function fill(r:int, g:int, b:int):void {
            fillColor = (r << 16) | (g << 8) | b;
        }

        private function line(x1:int, y1:int, x2:int, y2:int):void {
            graphics.beginFill(fillColor);
            graphics.moveTo(x1, y1);
            graphics.lineTo(x2, y2);
            graphics.endFill();
        }

        private function ellipse(cx:int, cy:int, rx:int, ry:int):void {
            graphics.beginFill(fillColor);
            graphics.drawEllipse(cx-rx/2, cy-ry/2, rx, ry);
            graphics.endFill();
        }

        private function rect(x:int, y:int, w:int, h:int):void {
            graphics.beginFill(fillColor);
            graphics.drawRect(x, y, w, h);
            graphics.endFill();
        }

        private function text(s:String, x:int, y:int):void {
            label.text = s;
            label.x = x;
            label.y = y - label.height;
        }

        private function display():void {
            background(213, 200, 255); // d5 c8 ff
            //smooth();
            fill(0, 0, 0);
            for (var i:int=0; i < npoints-2; i++) {
                var p:Point = points[npoints+i];
                for (var j:int = 0; j < 3; j++) {
                    var q:Point = points[p.link[j]];
                    line(p.x, p.y+CONTROLHEIGHT, q.x, q.y+CONTROLHEIGHT);
                }
            }
            fill(0, 0, 255);
            for (i=0; i < npoints-2; i++) {
                p = points[npoints+i];
                ellipse(p.x, p.y+CONTROLHEIGHT, 5, 5);
            }
            fill(255, 255, 0);
            for (i = 0; i < npoints; i++) {
                p = points[i];
                ellipse(p.x, p.y+CONTROLHEIGHT, 10, 10);
            }
            fill(100, 100, 100);
            rect(30, 10, WINWIDTH-34, 5);

            fill(200, 200, 200);
            rect(ndots*10, 4, 16, 16);
            fill(0, 0, 0);
            text(String(ndots), 4, 18);
        }

        private function movepoint():void {
            for (var i:int = 0; i < npoints-2; i++) {
                var origx:Number = points[npoints+i].x;
                var origy:Number = points[npoints+i].y;
                var newx:Number = origx;
                var newy:Number = origy;
                var t:Number = total();
                for (var x:int = -1; x <= 1; x++) {
                    for (var y:int = -1; y <= 1; y++) {
                        points[npoints+i].x = origx + x;
                        points[npoints+i].y = origy + y;
                        var tt:Number = total();
                        if (tt < t) {
                            newx = origx + x;
                            newy = origy + y;
                            t = tt;
                        }
                    }
                }
                points[npoints+i].x = newx;
                points[npoints+i].y = newy;
            }
        }

        private function reconnect():void {
            for (var i:int=0; i < npoints-3; i++) {
                var p1ind:int = npoints+i;
                var p1:Point = points[p1ind];
                for (var j:int=0; j < 3; j++) {
                    var p2ind:int = p1.link[j];
                    if (p2ind >= npoints) {
                        var p2:Point = points[p2ind];
                        if (dist(p1, p2) < 1.0) {
                            var c:int = (random(2) > 1.0 ? 1 : 0);
                            var ind1:int;
                            for (ind1 = 0; ind1 < 3; ind1++) {
                                if (p1.link[ind1] == p2ind)
                                    continue;
                                if (c-- == 0)
                                    break;
                            }

                            c = (random(2) > 1.0 ? 1 : 0);
                            var ind2:int;
                            for (ind2=0; ind2 < 3; ind2++) {
                                if (p2.link[ind2] == p1ind)
                                    continue;
                                if (c-- == 0)
                                    break;
                            }

                            if (p1.link[ind1] >= npoints) {
                                var p:Point = points[p1.link[ind1]];
                                for (var k:int = 0; k < 3; k++) {
                                    if (p.link[k] == p1ind) {
                                        p.link[k] = p2ind;
                                        break;
                                    }
                                }
                            }
                            if (p2.link[ind2] >= npoints) {
                                p = points[p2.link[ind2]];
                                for (k =0; k < 3; k++) {
                                    if (p.link[k] == p2ind) {
                                        p.link[k] = p1ind;
                                        break;
                                    }
                                }
                            }

                            var tmp:int = p1.link[ind1];
                            p1.link[ind1] = p2.link[ind2];
                            p2.link[ind2] = tmp;
                        }
                    }
                }
            }
        }

        private function dist2(p1:Point, p2:Point):Number {
            return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
        }

        private function dist(p1:Point, p2:Point):Number {
            return Math.sqrt(dist2(p1, p2));
        }

        private function total():Number {
            var v:Number = 0.0;
            for (var i:int = 0; i < npoints-2; i++) {
                var p1ind:int = npoints+i;
                var p1:Point = points[p1ind];
                for (var j:int = 0; j < 3; j++) {
                    var p2ind:int = p1.link[j];
                    var p2:Point = points[p2ind];
                    if (p2ind < npoints)
                        v += dist(p1, p2);
                    else if (p1ind < p2ind)
                        v += dist(p1, p2);
                }
            }
            return v;
        }

        private function mousePressed(e:MouseEvent):void {
            if (mouseY < CONTROLHEIGHT) {
                control = true;
            } else {
                var d:Number = 0.0;
                control = false;
                var p:Point = new Point(mouseX, mouseY-CONTROLHEIGHT);
                for (var i:int=0; i < npoints; i++) {
                    var dst:Number = dist(p, points[i]);
                    if (dst < d || d == 0.0) {
                        d = dst;
                        selind = i;
                    }
                }
                points[selind].x = mouseX;
                points[selind].y = mouseY-CONTROLHEIGHT;
            }
        }

        private function mouseDragged(e:MouseEvent):void {
            if (!e.buttonDown)
                return;
            if (control) {
                ndots = mouseX / 10;
                if (ndots < 3)
                    ndots = 3;
            } else {
                points[selind].x = mouseX;
                points[selind].y = mouseY-CONTROLHEIGHT;
            }
        }

        private function mouseReleased(e:MouseEvent):void {
            if (control) {
                ndots = mouseX / 10;
                if (ndots < 3)
                    ndots = 3;
                initialize(ndots);
            }
        }
    }
}
