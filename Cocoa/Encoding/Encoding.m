//
// NSStrで様々なエンコーディングを利用するテスト。
// /tmp/junk にはEUCファイルがあるものとする。
//

#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
  
  // これがファイルからデータを読むやり方だったのか....
  NSString *str = [NSString stringWithContentsOfFile: @"/tmp/junk" encoding:NSJapaneseEUCStringEncoding error:nil];
  
  NSLog(str);
  
  [str writeToFile:@"/tmp/junk1" atomically:NO encoding:NSUTF8StringEncoding error:nil];
  
  [pool release];
  return 0;
}






