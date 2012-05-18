#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];
  
  // insert code here...
  NSString *dirname = @"/Users/masui/DOC/bib/a";
  NSDirectoryEnumerator *direnum = [[NSFileManager defaultManager]
				     enumeratorAtPath:dirname];
  NSString *pname;
  while (pname = [direnum nextObject]) {
    if ([[pname pathExtension] isEqualToString:@"rtfd"]) {
      [direnum skipDescendents]; /* don’t enumerate this directory */
    }
    else{
      /* ...process file here... */
      NSString *fullpath = [NSString stringWithFormat:@"%@/%@", dirname, pname];
      NSFileHandle * file = [NSFileHandle fileHandleForReadingAtPath:fullpath];
      if(file == NULL) NSLog(@"null"); // なるほどディレクトリだとゼロになるのか
      NSLog([file className]);
      unsigned long long fileSize = [file seekToEndOfFile];
      NSLog(pname);
      NSLog(@"%qu",fileSize);
      
      //NSLog(pname);
    }
  }
  
  [pool release];
  return 0;
}
