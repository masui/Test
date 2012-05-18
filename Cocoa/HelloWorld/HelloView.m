//
// Hello, World�ߤ����ʤΤ�ɽ������ץ���ࡣ��ϫ����! 2006/10/17
//

#import "HelloView.h"

@implementation HelloView

- (id)initWithFrame:(NSRect)frameRect
{
  if ((self = [super initWithFrame:frameRect]) != nil) {
    // Add initialization code here
  }
  return self;
}

//
// NSString�Ȥ������ܸ��ľ�ܽ񤯤��ȤϤǤ��ʤ�
// (��˥�����ʸ����Ȥ��ƽ񤱤Фʤ�Ȥ��ʤ�Τ��⤷��ʤ�����@"..."�η����Ǥ�����)
// �ե������ɤ߽񤭤ϡ�FileHandle�ߤ����ʤΤ�Ȥ��ΤǤϤʤ���NSString�Υ᥽�åɤǼ¹Ԥ���
// ���̤ؤ�����⡢���Τ�NSString�Υ᥽�åɤȤ��Ƽ¸�����Ƥ��롣�ѤʤΡ�
//

- (void)drawRect:(NSRect)rect
{
  // ���ɤ��٤�
  [[NSColor whiteColor] set]; // �ɤ��˥��åȤ���󤫤���? ���ߥե�������������View?
  NSRectFill([self bounds]);
  
  // ʸ�������������
  [[NSColor blackColor] set];

  //
  // NSStringʸ����ΰ����ˤĤ��Ƥϰʲ���ʸ��˽񤤤Ƥ��롣
  // http://www.mosa.gr.jp/htmdocs/article/document/StringProgrammingGuide.pdf
  //

  /////////////////////////////////////////////////////////////////////////////
  // EUC�ե����� /tmp/junk ����ʸ������ɤ߽Ф���
  //  NSString *str = [NSString stringWithContentsOfFile:@"/tmp/junk"
  //			    encoding:NSJapaneseEUCStringEncoding
  //			    error:nil];

  // sample.txt �Ȥ���EUC�ե������Project�ͥե������ɲ� ���Ƥ����С�
  // �ӥ�ɤ����Ȥ���ưŪ�˥꥽��������˥��ԡ������褦�Ǥ��롣
  // ����򥢥���������ˤ� mainBundle �᥽�åɤ����Ѥ��롣 (Cocoa��p270������)
  NSBundle *mainBundle = [NSBundle mainBundle];
  NSString *path = [mainBundle pathForResource:@"sample" ofType:@"txt"]; // ñ�˥ե�����̾�ȳ�ĥ��
  NSString *str = [NSString stringWithContentsOfFile:path
			    encoding:NSJapaneseEUCStringEncoding
			    error:nil];
  NSColor *nsColor = [NSColor colorWithDeviceRed:1.0 green:1.0 blue:0.0 alpha:0.5]; // ����RGB�ǻ��ꤹ����
  NSFont *nsFont = [NSFont fontWithName:@"HiraKakuPro-W3" size:30];

  // �쵤��°���򥻥åȤ�����
  NSDictionary *attributes =
    [NSDictionary dictionaryWithObjectsAndKeys:
		  nsFont, NSFontAttributeName,
		  nsColor, NSForegroundColorAttributeName,
		  nil
     ];
  NSPoint point = { 20, 20 }; // NSPoint�Ϥ����ι�¤�Τǡ����饹�ǤϤʤ���
  [str drawAtPoint:point withAttributes:attributes];

  //////////////////////////////////////////////////////////////////////////////
  // UTF8��ľ�ܽ񤯾�硣 @"����" �Τ褦�˽񤱤ʤ���
  NSString *str2 = [NSString stringWithUTF8String:"\xe5\xa2\x97\xe4\xba\x95"]; // ������פ�UTF8ɽ��
  
  // °����ҤȤĤ������ꤹ����
  NSMutableDictionary *attributes2 = [NSMutableDictionary dictionary]; // �����NSDictionary�Υ᥽�å�...
  [attributes2 setObject:[NSFont fontWithName:@"HiraKakuPro-W3" size:24] forKey:NSFontAttributeName];
  [attributes2 setObject:[NSColor redColor] forKey:NSForegroundColorAttributeName];  
  
  // NSPoint��ľ�ܻ��ꤹ����
  [str2 drawAtPoint:NSMakePoint(100,100) withAttributes:attributes2];
  
  //NSLog(@"%@\n",[attributes2 description]);
  //NSLog(@"%s\n","abcde");
  
  // ���褬���٤ⵯ�������NSLayoutManager��Ȥ��Τ��������ȤΤ���
}

@end
