//
// NSStr���͡��ʥ��󥳡��ǥ��󥰤����Ѥ���ƥ��ȡ�
// /tmp/junk �ˤ�EUC�ե����뤬�����ΤȤ��롣
//

#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
  
  // ���줬�ե����뤫��ǡ������ɤ��������ä��Τ�....
  NSString *str = [NSString stringWithContentsOfFile: @"/tmp/junk" encoding:NSJapaneseEUCStringEncoding error:nil];
  
  NSLog(str);
  
  [str writeToFile:@"/tmp/junk1" atomically:NO encoding:NSUTF8StringEncoding error:nil];
  
  [pool release];
  return 0;
}






