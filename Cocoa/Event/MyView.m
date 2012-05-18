//
// �ޥ������٥�Ȥȥ������٥�ȤΥƥ���
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

  // ����View��FirstResponder�ˤʤäƤ��ʤ��ȥ������Ϥ�����դ��Ƥ���ʤ��ΤǤ��������ꡣ
  // ���Τ�������롼���������֤��Ȥ��ޤ������ʤ���
  [[self window] makeFirstResponder:self];

  NSRect drawrect;
  drawrect = NSMakeRect(mousepos.x,mousepos.y,30,30);
  [[NSColor blackColor] set];

  // �����񤯤ˤϡ�NSRectFill()�Τ褦�ʴؿ������Ѥ�����ˡ��NSBezierPath���饹��Ȥ���ˡ������ߤ�����
  // NSRectFill() �ˤ����ʴؿ���Ȥ���ˡ�����٤ϰ�������®���Ȥ������ȡ�

  //NSRectFill(drawrect);
  [NSBezierPath fillRect:drawrect];
}

- (void)mouseDown:(NSEvent *)event
{
  NSPoint point,point2;
  point = [event locationInWindow]; // �����NSWindow��κ�ɸ
  point2 = [self convertPoint:point fromView:nil]; // View��κ�ɸ���Ѵ�
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
