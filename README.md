# ts-ue4dumper

Using TypeScript and Frida to do UE4dump, highly based on project [frida-ue4dump](https://github.com/hackcatml/frida-ue4dump). But it is more modular, and uses C++ to get offsets, making it easier to read and modify.

- UE4 version : 4.26~4.27
- Frida version : 16.4.1
- Tested on `com.netease.race` and `com.ShuiSha.FPS2`.

### What should you do before using it
1. Manually find the offset in libUE4.so and replace them in `utils/GAME.cpp`
2. Modify CMakeList.txt to build your own so, or use the so in `utils/output`.  `libUE4Offset_1.so` for `com.netease.race`, and `libUE4Offset_2.so` for `com.ShuiSha.FPS2` or other game that has standard offset.
3. push the offset-so to the phone

### How to compile & load


```sh
$ git clone https://github.com/yring-me/ts-ue4dumper.git
$ cd frida-agent/
$ npm install
$ adb push ./utils/output/libUE4Offset_1.so /data/local/tmp/libUE4Offset.so
$ frida -U -f com.example.android --no-pause -l _agent.js
```
### How to dump
In frida terminal
```sh
$ rpc.exports.DumpSdk()
$ rpc.exports DumpActor()
```
In terminal
```sh
adb pull /sdcard/dump.txt dump.txt
```
### Development workflow

To continuously recompile on change, keep this running in a terminal:

```sh
$ npm run watch
```
To switch the Game between `com.netease.race` and `com.ShuiSha.FPS2` , in `utils/GAME.h`
```cpp
#define COM_NETEASE_RACE 1 // true for com.netease.race, false for com.ShuiSha.FPS2 or standard offset
```

### Some issues
1. `dlopen failed: couldn't map "/data/local/tmp/xxx.so" segment 1: Permission denied `
```sh
$ adb shell
$ su
$ getenforce  // output: Enforcing
$ setenforce 0
$ getenforce  // output: Permissive 
```

