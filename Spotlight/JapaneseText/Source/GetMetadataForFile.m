/*
 * Copyright (c) 2005-2006 KATO Kazuyoshi
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
 * BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

#include <CoreFoundation/CoreFoundation.h>
#include <CoreServices/CoreServices.h> 

#import "TEC.h"
#import "JapaneseString.h"

static NSMutableDictionary* converters_ = NULL;

static TECConverter*
createConverter(NSStringEncoding encoding)
{
	TECConverter* converter;
	
	converter = [converters_ objectForKey: [NSNumber numberWithInt: encoding]];

	if (! converter) {
		converter = [[TECConverter alloc] initWithEncoding: encoding];
		[converters_ setObject: converter
						forKey: [NSNumber numberWithInt: encoding]];
		[converter release];
	}
	
	return converter;
}

Boolean
GetMetadataForFile(void* thisInterface, 
				   CFMutableDictionaryRef attributes, 
				   CFStringRef contentTypeUTI,
				   CFStringRef path)
{
	NSAutoreleasePool* pool = [[NSAutoreleasePool alloc] init];

	if (converters_ == NULL) {
		converters_ = [[NSMutableDictionary alloc] init];
	}
	
	// Open File
	NSData* data = [NSData dataWithContentsOfFile: (NSString*) path];
    if (! data) {
        [pool release];
        return NO;
    }
	
	// Detect Encoding
	NSStringEncoding encoding;
	encoding = [JapaneseString detectEncoding: data];
	
	// Convert Encoding
	NSString* contents;
	if (encoding == NSUnicodeStringEncoding ||
		encoding == CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingUTF16BE) ||
		encoding == CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingUTF16LE)) {
		contents = [[NSString alloc] initWithData: data
										 encoding: encoding];
	} else {
		TECConverter* converter = createConverter(encoding);
		contents = [converter convertToString: data];
	}
		
	// Set Metadata
	BOOL success;
	if (contents) {
		[(NSMutableDictionary*) attributes setObject: contents
											  forKey: (NSString*) kMDItemTextContent];
		success = YES;
	} else {
		success = NO;
	}

	[pool release];
    return success;
}
