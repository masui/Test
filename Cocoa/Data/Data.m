//
// Cocoa流にファイルを読んできてバイト列として処理する
// 2006/10/18 増井
//
// /tmp/data というバイナリファイルを読み出す。
//


#import <Foundation/Foundation.h>

int main (int argc, const char * argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

    NSData *nsdata = [NSData dataWithContentsOfFile:@"/tmp/data"];
    NSLog(@"%d",[nsdata length]);

    unsigned char *data = malloc([nsdata length]);
    NSCAssert(data != NULL, @"alloc fail"); // これはC関数内のアサーション。メソッド内だとNSAssertを使う
    [nsdata getBytes:data]; // data[]に/tmp/dataの内容がコピーされる

    printf("%c\n",data[2]);

    [pool release];
    return 0;
}
