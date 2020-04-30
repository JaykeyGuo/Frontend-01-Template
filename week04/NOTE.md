# W04-Geek-FE

```objective-c
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // var context = new JSContext
        JSContext* context = [[JSContext alloc] init];
        JSValue* result;
        while (true) {
            
            char sourcecode[1024];
            
            scanf("%s", sourcecode);
            NSString* code = [NSString stringWithUTF8String:sourcecode];
            
            // context.evaluateScript('')
            result = [context evaluateScript:code];
        
            // console.log(result.toString());
            NSLog(@"%@", [result toString]);
        }
    }
    return 0;
}
```

```objective-c
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // var context = new JSContext
        JSContext* context = [[JSContext alloc] init];
        JSValue* result;
        NSString* code = @"(function(x) { return x * x; })";
        
        // context.evaluateScript('')
        result = [context evaluateScript:code];
        
        [result callWithArguments:@[]];
        
        JSValue* arg1 = [JSValue valueWithInt32:12 inContext:context];
    
        // console.log(result.toString());
        NSLog(@"%@", [[result callWithArguments:@[arg1]] toString]);
    }
    return 0;
}
```

```objective-c
#import <Foundation/Foundation.h>
#import <JavaScriptCore/JavaScriptCore.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // var context = new JSContext
        JSContext* context = [[JSContext alloc] init];
        JSValue* result;
        NSString* code = @"new Promise(resolve => resolve()).then(() => this.a = 3), function() {return this.a}";
        
        // context.evaluateScript('')
        result = [context evaluateScript:code];
        
        // [result callWithArguments:@[]];
    
        // console.log(result.toString());
        NSLog(@"%@", [[result callWithArguments:@[]] toString]);
    }
    return 0;
}

```



其实所有的JS代码都是一个微任务，只是哪些微任务构成了一个宏任务；执行在JS引擎里的就是微任务，执行在JS引擎之外的就是宏任务，循环宏任务的工作就是事件循环。

resolve的执行，产生了一个额外的微任务，添加在微任务队列的最后。



> 拿浏览器举例：setTimeout、setInterval 这种其实不是 JS 语法本身的 API，是 JS 的宿主浏览器提供的 API， 所以是宏任务。
> 而 Promise 是 JS 本身自带的 API，这种就是微任务。
>
> 总结：宿主提供的方法是宏任务，JS 自带的是微任务

```js
// 逗号表达式，最终会执行最后一个表达式
var x = (1, 2, 3);
// output => 3
```



Job Queue就是微任务的队列，P104