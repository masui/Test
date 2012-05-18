//
// Hello, Worldみたいなのを表示するプログラム。苦労した! 2006/10/17
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
// NSStringとして日本語を直接書くことはできない
// (ユニコード文字列として書けばなんとかなるのかもしれないが、@"..."の形式では駄目)
// ファイル読み書きは、FileHandleみたいなのを使うのではなく、NSStringのメソッドで実行する
// 画面への描画も、何故かNSStringのメソッドとして実現されている。変なの。
//

- (void)drawRect:(NSRect)rect
{
  // 白く塗り潰し
  [[NSColor whiteColor] set]; // どこにセットするんかいな? 現在フォーカスがあるView?
  NSRectFill([self bounds]);
  
  // 文字色を黒に設定
  [[NSColor blackColor] set];

  //
  // NSString文字列の扱いについては以下の文書に書いてある。
  // http://www.mosa.gr.jp/htmdocs/article/document/StringProgrammingGuide.pdf
  //

  /////////////////////////////////////////////////////////////////////////////
  // EUCファイル /tmp/junk から文字列を読み出す。
  //  NSString *str = [NSString stringWithContentsOfFile:@"/tmp/junk"
  //			    encoding:NSJapaneseEUCStringEncoding
  //			    error:nil];

  // sample.txt というEUCファイルを、Project⇒ファイル追加 しておけば、
  // ビルドしたとき自動的にリソースの中にコピーされるようである。
  // それをアクセスするには mainBundle メソッドを利用する。 (Cocoa本p270あたり)
  NSBundle *mainBundle = [NSBundle mainBundle];
  NSString *path = [mainBundle pathForResource:@"sample" ofType:@"txt"]; // 単にファイル名と拡張子
  NSString *str = [NSString stringWithContentsOfFile:path
			    encoding:NSJapaneseEUCStringEncoding
			    error:nil];
  NSColor *nsColor = [NSColor colorWithDeviceRed:1.0 green:1.0 blue:0.0 alpha:0.5]; // 色をRGBで指定する場合
  NSFont *nsFont = [NSFont fontWithName:@"HiraKakuPro-W3" size:30];

  // 一気に属性をセットする場合
  NSDictionary *attributes =
    [NSDictionary dictionaryWithObjectsAndKeys:
		  nsFont, NSFontAttributeName,
		  nsColor, NSForegroundColorAttributeName,
		  nil
     ];
  NSPoint point = { 20, 20 }; // NSPointはただの構造体で、クラスではない。
  [str drawAtPoint:point withAttributes:attributes];

  //////////////////////////////////////////////////////////////////////////////
  // UTF8を直接書く場合。 @"増井" のように書けない。
  NSString *str2 = [NSString stringWithUTF8String:"\xe5\xa2\x97\xe4\xba\x95"]; // 「増井」のUTF8表現
  
  // 属性をひとつずつ設定する場合
  NSMutableDictionary *attributes2 = [NSMutableDictionary dictionary]; // これはNSDictionaryのメソッド...
  [attributes2 setObject:[NSFont fontWithName:@"HiraKakuPro-W3" size:24] forKey:NSFontAttributeName];
  [attributes2 setObject:[NSColor redColor] forKey:NSForegroundColorAttributeName];  
  
  // NSPointを直接指定する場合
  [str2 drawAtPoint:NSMakePoint(100,100) withAttributes:attributes2];
  
  //NSLog(@"%@\n",[attributes2 description]);
  //NSLog(@"%s\n","abcde");
  
  // 描画が何度も起こる場合はNSLayoutManagerを使うのが正しいとのこと
}

@end
