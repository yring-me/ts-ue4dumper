import * as OFFSET from "./offset.js";
import { getLocalPlayer, getUObjectBaseObjectFromId, getObjectCount, writeStruct, file, getFNameFromID } from "./utils.js"
import { UObject } from "./struct.js";

function testOffset(pointer: NativePointer, baseOffset: number) {
    for (var i = -30; i < 30; i++) {
        var ptr = pointer.add(baseOffset + i * 8).readPointer();
        if (ptr as unknown as number > 0x70000000) {
            console.log(`ptr: ${ptr.toString(16)},offset: ${i * 8}`);
        }
    }
}

/**
 *  get all actor name
 *  */
export function dumpActorName(GWorld: NativePointer, GNames: NativePointer, isGetLocalActor: boolean = false) {

    var Level = GWorld.add(OFFSET.offset_UWorld_PersistentLevel).readPointer()
    console.log("Level :", Level)

    var Actors = Level.add(OFFSET.offset_ULevel_Actors).readPointer()
    console.log("Actors Array :", Actors)

    var Actors_Num = Level.add(OFFSET.offset_ULevel_Actors).add(8).readU32()
    console.log("Actors_num :", Actors_Num)

    var Actors_Max = Level.add(OFFSET.offset_ULevel_Actors).add(0xc).readU32()
    console.log("Actors_Max :", Actors_Max)


    var LocalPlayer = getLocalPlayer(GWorld);

    for (var index = 0; index < Actors_Num; index++) {
        var actor = Actors.add(index * Process.pointerSize).readPointer()
        if (actor == NULL || actor as unknown as number == 0) { continue; }
        //console.log("actor", actor)

        var FNameEntryAllocator = GNames
        var FName = actor.add(OFFSET.offset_UObject_NamePrivate); //Class AActor : public UObject
        var ComparisonIndex = FName.add(0).readU32()

        var FNameBlockOffsetBits = 16
        var FNameBlockOffsets = 65536

        var Block = ComparisonIndex >> FNameBlockOffsetBits
        var Offset = ComparisonIndex & (FNameBlockOffsets - 1)

        var Blocks = FNameEntryAllocator.add(OFFSET.offset_FNamePool_Blocks)

        var FNameEntry = Blocks.add(Block * Process.pointerSize).readPointer().add(Offset * OFFSET.FNameStride)

        var FNameEntryHeader = FNameEntry.readU16()


        var isWide = FNameEntryHeader & 1
        var Len = FNameEntryHeader >> OFFSET.FNameEntry_LenBit

        if (0 == isWide) {
            if (isGetLocalActor && LocalPlayer != null && actor.toString(16) == LocalPlayer.toString(16)) {
                console.log(`\x1b[32m[+] found local actor ${actor}: ${FNameEntry.add(2).readCString(Len)}\x1b[0m`)
                return;
            }
            else if (isGetLocalActor === false)
                console.log(`\x1b[32m[+] actor ${actor}: ${FNameEntry.add(2).readCString(Len)}\x1b[0m`)
        }
    }
}

export function dumpSDK(GNames: NativePointer, GUObjectArray: NativePointer, isActorDump: boolean = false) {
    var names: string[] = []
    var ObjectCount = getObjectCount(GUObjectArray);


    for (var index = 0; index < ObjectCount; index++) {
        var UObjectBaseObject = getUObjectBaseObjectFromId(GUObjectArray, index);
        if (UObject.isValid(UObjectBaseObject)) {
            // console.log(`UObjectBaseObject: ${UObjectBaseObject}`);
            var clazz = UObject.getClass(UObjectBaseObject);

            var name = UObject.getName(GNames, clazz);

            // console.log(name);
            // var ue4 = Module.findBaseAddress("libUE4.so") as NativePointer;
            // var tostring_addr = ue4.add(0x6B8F36C);
            // var toString = new NativeFunction(tostring_addr, 'pointer', ['pointer']);
            // var name = toString(UObjectBaseObject);
            // file.write(`name: , ${name.readCString()}, nameid: ${getFNameFromID(GNames, index)}\n`);

            if (name && (!names.includes(name))) {
                names.push(name);
                writeStruct(GNames, clazz, isActorDump);
            }

        }
    }
}

export function dumpActor(GNames: NativePointer, GUObjectArray: NativePointer) {
    dumpSDK(GNames, GUObjectArray, true);
}