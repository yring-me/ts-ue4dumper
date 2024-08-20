var GWorld: NativePointer = ptr(0);
export var GNames: NativePointer = ptr(0);
var GUObjectArray: NativePointer = ptr(0);
var ue4: NativePointer | null = ptr(0);
import { dumpActor, dumpSDK, dumpActorName } from "./dump.js";

// com.netease.race
// var GNames_offset = 0x15D458C0
// var GWorld_offset = 0x15F1CE60
// var GUObjectArray_offset = 0x15DA0788

// com.ShuiSha.FPS2
var GNames_offset = 0xAE7B500
var GWorld_offset = 0xB036900
var GUObjectArray_offset = 0xAEBF7D8

function init() {
    ue4 = Module.findBaseAddress("libUE4.so");
    if (ue4 != null) {
        GWorld = ue4.add(GWorld_offset).readPointer()
        GNames = ue4.add(GNames_offset)
        GUObjectArray = ue4.add(GUObjectArray_offset)
    }
}

function DumpSDK() {
    Java.perform(function () {
        init();
        dumpSDK(GNames, GUObjectArray);
    })
}


function DumpActor() {
    Java.perform(function () {
        init();
        dumpActor(GNames, GUObjectArray);
    })
}

function DumpActorName() {
    Java.perform(function () {
        init();
        dumpActorName(GWorld, GNames, false);
    })
}

rpc.exports = {
    DumpSDK: DumpSDK,
    DumpActor: DumpActor,
    DumpActorName: DumpActorName,
}

