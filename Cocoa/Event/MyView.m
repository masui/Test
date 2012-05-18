//
// マウスイベントとキーイベントのテスト
//
#import "MyView.h"

@implementation MyView

- (id)initWithFrame:(NSRect)frameRect
{
  if ((self = [super initWithFrame:frameRect]) != nil) {
    // Add initialization code here
    mousepos = NSMakePoint(100,100);
  }
  return self;
}

- (void)drawRect:(NSRect)rect
{
  [[NSColor whiteColor] set];
  NSRectFill([self bounds]);

  // このViewがFirstResponderになっていないとキー入力を受け付けてくれないのでここで設定。
  // 何故か初期化ルーチンの中に置くとうまくいかない。
  [[self window] makeFirstResponder:self];

  NSRect drawrect;
  drawrect = NSMakeRect(mousepos.x,mousepos.y,30,30);
  [[NSColor blackColor] set];

  // 矩形を書くには、NSRectFill()のような関数を利用する方法とNSBezierPathクラスを使う方法があるみたい。
  // NSRectFill() にたいな関数を使う方法は精度は悪いが高速だということ。

  //NSRectFill(drawrect);
  [NSBezierPath fillRect:drawrect];
}

- (void)mouseDown:(NSEvent *)event
{
  NSPoint point,point2;
  point = [event locationInWindow]; // これはNSWindow内の座標
  point2 = [self convertPoint:point fromView:nil]; // View内の座標に変換
  printf("%f %f\n",point2.x,point2.y);
  mousepos = point2;

  [self setNeedsDisplay:YES];
}

- (void)keyDown:(NSEvent *)event
{
  printf("-- KeyDown --\n");
  NSLog(@"%@\n",[event characters]);
  NSLog(@"%d\n",[event keyCode]);
  NSLog(@"%x\n",[event modifierFlags]);
}

@end
