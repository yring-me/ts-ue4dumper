import * as OFFSET from "./offset.js";
import { UObject, UStruct, FField } from "./struct.js";
import { UStructProperty, UObjectProperty, FProperty, UClassProperty, UInterfaceProperty, UArrayProperty, USetProperty, UMapProperty, UByteProperty, UEnum, UEnumProperty, UFunction, UField } from "./struct.js"
import { FFieldPointer, UClassPointer, UObjectPointer, UStructPointer, FPropertyPointer, UEnumPointer, UEnumPropertyPointer, UFiledPointer } from "./struct.js"
import { EFunctionFlags, EPropertyFlags, funcFlags } from "./struct.js";

export var file = new File('/sdcard/dump.txt', 'w');
var UObjectPropertyList = ["ObjectProperty", "WeakObjectProperty", "LazyObjectProperty", "AssetObjectProperty", "SoftObjectProperty"]
var MetaClassList = ["ClassProperty", "AssetClassProperty", "SoftClassProperty"]

export function getFNameFromID(GName: NativePointer, index: number) {
    var Block = index >> 16;
    var Offset = index & 65535;

    var FNamePool = GName;

    var NamePoolChunk = FNamePool.add(OFFSET.offset_FNamePool_Blocks + Block * Process.pointerSize).readPointer();
    // console.log(`NamePoolChunk: ${NamePoolChunk}`);
    var FNameEntry = NamePoolChunk.add(OFFSET.FNameStride * Offset);

    var FNameEntryHeader = FNameEntry.add(OFFSET.offset_FNameEntry_Header_Offset).readU16();


    // console.log(`FNameEntryHeader: ${FNameEntryHeader}`);
    var str_addr = FNameEntry.add(OFFSET.offset_FNameEntry_String);
    // console.log(`str_addr: ${str_addr}`);
    var str_length = FNameEntryHeader >> OFFSET.FNameEntry_LenBit;
    var wide = FNameEntryHeader & 1;

    // console.log(`str_length: ${str_length}`)
    if (wide) return "widestr";

    if (str_length > 0 && str_length < 256) {
        var str = str_addr.readCString(str_length);
        return str;
    } else {
        return "None";
    }
}

export function getLocalPlayer(GWorld: NativePointer) {
    var owningGameInstance = GWorld.add(OFFSET.offset_GWorld_GameInstance).readPointer()
    var localPlayers = owningGameInstance.add(OFFSET.offset_GameInstance_LocalPlayers).readPointer()
    var localPlyer = localPlayers.add(0x0).readPointer()
    var playerController = localPlyer.add(OFFSET.ULocalPlayer_PlayerController_OFFSET).readPointer()
    var local_pwn = playerController.add(OFFSET.GAME_ACKNOWLEDEGED_PAWN_OFFSET).readPointer()
    return local_pwn
}

export function getUObjectBaseObjectFromId(GUObjectArray: NativePointer, index: number): UObjectPointer {
    var FUObjectItem = GUObjectArray.add(OFFSET.GAME_FUObjectArray_TUObjectArray_OFFSET).readPointer();

    var chunkIndex = Math.floor(index / 0x10000) * Process.pointerSize;
    var WithinChunkIndex = (index % 0x10000) * OFFSET.GAME_FUOBJECT_ITEM_SIZE;

    var chunk = FUObjectItem.add(chunkIndex);
    var FUObjectItemObjects = chunk.readPointer();

    var UObjectBaseObject = FUObjectItemObjects.add(WithinChunkIndex).readPointer();
    return UObjectBaseObject;
}

export function getObjectCount(GUObjectArray: NativePointer) {
    var GUObjectElementCount = GUObjectArray.add(OFFSET.GAME_FUObjectArray_TUObjectArray_OFFSET).add(OFFSET.GAME_TUObjectArray_NumElements_OFFSET).readU32()
    // console.log(`\x1b[32m[+] GUObjectElementCount: ${GUObjectElementCount}\x1b[0m`)
    return GUObjectElementCount;
}

export function resolveProp_writeByteEnum(GName: NativePointer, enumObj: UEnumPointer): string {
    if (UObject.isValid(enumObj)) {
        var enumClasses: string[] = [];
        var enumClassStr = "";
        var enumName = UByteProperty.getName(GName, enumObj);
        if (enumName == null) return "byte";

        if (!enumClasses.includes(enumName)) {
            enumClasses.push(enumName);
            enumClassStr += "enum " + enumName + " {";
            for (var count = 0; count < UEnum.getCount(enumObj); count++) {
                var index = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize).readU32();
                var value = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize + OFFSET.FName_Size).readU64().toString(16);
                enumClassStr += "\n\t" + (getFNameFromID(GName, index) as string).replace(enumName + "::", "")
                enumClassStr += " = " + value;
            }
            enumClassStr += "\n};\n";
            return "enum " + enumName;
        }
        else {
            return "enum " + enumName;
        }
    }
    return "byte";
}

export function resolveProp_writeEnumProperty(GName: NativePointer, prop: UEnumPropertyPointer) {
    var enumName = UEnumProperty.getName(GName, prop);
    var enumObj = UEnumProperty.getEnum(prop);
    if (enumName == null) return "NULL";
    var enumClasses: string[] = [];
    var enumClassStr = "";
    if (!enumClasses.includes(enumName)) {
        enumClasses.push(enumName);
        enumClassStr += "enum " + enumName + " {";
        for (var count = 0; count < UEnum.getCount(enumObj); count++) {
            var index = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize).readU32();
            var value = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize + OFFSET.FName_Size).readU64().toString(16);
            enumClassStr += "\n\t" + (getFNameFromID(GName, index) as string).replace(enumName + "::", "")
            enumClassStr += " = " + value;
        }
        enumClassStr += "\n};\n";
        return "enum " + enumName;
    } else {
        return "enum " + enumName;
    }

}

export function resolveProp(GName: NativePointer, recurrce: UStructPointer[], prop: FPropertyPointer): string {
    if (prop == null) return "None";
    var className = FField.getClassName(GName, prop) as string;

    if (UObjectPropertyList.includes(className)) {
        var propertyClass = UObjectProperty.getPropertyClass(prop);
        recurrce.push(...[propertyClass]);
        return UObject.getName(GName, propertyClass) + "*";
    }
    else if (MetaClassList.includes(className)) {
        var metaClass = UClassProperty.getMetaClass(prop);
        recurrce.push(...[metaClass]);
        return "class" + UObject.getName(GName, metaClass);
    }
    else if (className === "InterfaceProperty") {
        var interfaceClass = UInterfaceProperty.getInterfaceClass(prop);
        recurrce.push(...[interfaceClass]);
        return "interface class" + UObject.getName(GName, interfaceClass);
    }
    else if (className === "StructProperty") {
        var structClass = UStructProperty.getStruct(prop);
        recurrce.push(...[structClass]);
        return "struct" + UObject.getName(GName, structClass);
    }
    else if (className === "ArrayProperty") {
        return resolveProp(GName, recurrce, UArrayProperty.getInner(prop)) + "[]";
    }
    else if (className === "SetProperty") {
        return "<" + resolveProp(GName, recurrce, USetProperty.getElementProp(prop)) + ">";
    }
    else if (className === "MapProperty") {
        return "<" + resolveProp(GName, recurrce, UMapProperty.getKeyProp(prop)) + ", " + resolveProp(GName, recurrce, UMapProperty.getValueProp(prop)) + ">";
    }
    else if (className === "BoolProperty") {
        return "bool";
    }
    else if (className === "UByteProperty") {
        var enumObj = UByteProperty.getEnum(prop);
        return resolveProp_writeByteEnum(GName, enumObj);
    }
    else if (className === "IntProperty") {
        return "int";
    }
    else if (className === "Int8Property") {
        return "int8";
    }
    else if (className === "Int16Property") {
        return "int16";
    }
    else if (className === "Int64Property") {
        return "int64";
    }
    else if (className === "UInt16Property") {
        return "uint16";
    }
    else if (className === "UInt32Property") {
        return "uint32";
    }
    else if (className === "UInt64Property") {
        return "uint64";
    }
    else if (className === "FloatProperty") {
        return "float";
    }
    else if (className === "DoubleProperty") {
        return "double";
    }
    else if (className === "EnumProperty") {
        return resolveProp_writeEnumProperty(GName, prop);
    }
    else if (className === "StrProperty") {
        return "FString";
    }
    else if (className === "TextProperty") {
        return "FText";
    }
    else if (className === "NameProperty") {
        return "FName";
    }
    else if (className === "DelegateProperty" || className === "MulticastDelegateProperty") {
        return "delegate";
    }
    else {
        return FField.getName(GName, prop) + "(" + className + ")";
    }
}

export function writeByteProperty(GName: NativePointer, prop: FFieldPointer) {
    var thisFieldName = FField.getName(GName, prop);
    var enumObj = UByteProperty.getEnum(prop);

    if (UObject.isValid(enumObj)) {
        var enumName = UByteProperty.getName(GName, prop);
        file.write(`\tenum ${enumName} ${thisFieldName} { //[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        for (var count = 0; count < UEnum.getCount(enumObj); count++) {
            var index = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize).readU32();

            var value = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize + OFFSET.FName_Size).readU64().toString(16);
            file.write(`\t\t${(getFNameFromID(GName, index) as string).replace(enumName + "::", "")} = ${value}\n`)
        }
        file.write("\t};\n")
    } else {
        file.write(`\tbyte ${thisFieldName}; //[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
    }
}

export function writeEnumProperty(GName: NativePointer, prop: FFieldPointer) {
    var thisFieldName = FField.getName(GName, prop);

    var enumName = UEnumProperty.getName(GName, prop);

    var enumObj = UEnumProperty.getEnum(prop);
    file.write(`\tenum ${enumName} ${thisFieldName} { //[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
    for (var count = 0; count < UEnum.getCount(enumObj); count++) {
        // console.log(UEnum.getTpairArray(enumObj));
        var index = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize).readU32();
        var value = UEnum.getTpairArray(enumObj).add(count * OFFSET.enumItemSize + OFFSET.FName_Size).readU64().toString(16);

        file.write(`\t\t${(getFNameFromID(GName, index) as string).replace(enumName + "::", "")} = ${value}\n`)
    }
    file.write("\t};\n")
}

export function writeStructChild(GName: NativePointer, children: FFieldPointer) {
    var recurrce = [] //use for recursion,but not using now
    var child = children;

    while (UObject.isValid(child)) {
        var prop = child;
        var thiFieldName = FField.getName(GName, child);
        var className = FField.getClassName(GName, child);

        if (className == null) continue;

        if (UObjectPropertyList.includes(className)) {
            var propertyClass = UObjectProperty.getPropertyClass(prop);
            file.write(`\t${UObject.getName(GName, propertyClass)}* ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }

        else if (MetaClassList.includes(className)) {
            var metaClass = UClassProperty.getMetaClass(prop);
            file.write(`\t${UObject.getName(GName, metaClass)}* ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }

        else if (className === "InterfaceProperty") {
            var interfaceClass = UInterfaceProperty.getInterfaceClass(prop);
            file.write(`\tinterface class ${UObject.getName(GName, interfaceClass)}* ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`)
        }

        else if (className === "StructProperty") {
            var Struct = UStructProperty.getStruct(prop);
            file.write(`\t${UObject.getName(GName, Struct)} ${className}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
            recurrce.push(Struct);
        }

        else if (className === "ArrayProperty") {
            file.write(`\t${resolveProp(GName, recurrce, UArrayProperty.getInner(prop))}[] ${thiFieldName}; //[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);

        }
        else if (className === "SetProperty") {
            file.write(`\t${resolveProp(GName, recurrce, USetProperty.getElementProp(prop))} ${thiFieldName}; //[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }

        else if (className === "MapProperty") {
            file.write(`\t<${resolveProp(GName, recurrce, UMapProperty.getKeyProp(prop))}, ${resolveProp(GName, recurrce, UMapProperty.getValueProp(prop))}> ${thiFieldName}; //[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "BoolProperty") {
            file.write(`\tbool ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "ByteProperty") {
            writeByteProperty(GName, prop);
        }
        else if (className === "IntProperty") {
            file.write(`\tint ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "Int8Property") {
            file.write(`\tint8 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "Int16Property") {
            file.write(`\tint16 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "Int32Property") {
            file.write(`\tint32 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "Int64Property") {
            file.write(`\tint64 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "UInt16Property") {
            file.write(`\tuint16 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "UInt32Property") {
            file.write(`\tuint32 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "UInt64Property") {
            file.write(`\tuint64 ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "FloatProperty") {
            file.write(`\tfloat ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "DoubleProperty") {
            file.write(`\tdouble ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "EnumProperty") {
            writeEnumProperty(GName, prop);
        }
        else if (className === "TextProperty") {
            file.write(`\tFText ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "NameProperty") {
            file.write(`\tFName ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "DelegateProperty" || className === "MulticastDelegateProperty" || className === "MulticastInlineDelegateProperty" || className === "MulticastSparseDelegateProperty") {
            file.write(`\tdelegate ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else if (className === "XigPtrProperty") {
            file.write(`\tXigPtr ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`);
        }
        else {
            file.write(`\t${className} ${thiFieldName}; \t//[Offset: ${ptr(FProperty.getOffset(prop))}, Size: ${FProperty.getElementSize(prop)}]\n`)
        }
        file.flush();
        child = FField.getNext(child);

    }
    return recurrce;

}

export function writeStructFunc(GName: NativePointer, children: UFiledPointer) {
    // UFieldPointer will be cast to UStructPointer,  UField inheriting from UStruct garantee its correctness


    var recurrce: UStructPointer[] = [];
    while (UObject.isValid(children)) {
        var prop = children;
        var thisFieldName = UObject.getName(GName, prop);
        var className = UObject.getClassName(GName, prop);

        if (className?.startsWith("Function") || className === "DelegateFunction") {
            // writeUFunctionStruct(GName, children)
            var returnVal = "Void";
            var params = "";
            var flags = "";

            var funcParmsProperties: FFieldPointer = UStruct.getChildProperties(prop);
            // FFieldPointer will be cast to FFPropertyPointer,  FFProperty inheriting from FField garantee its correctness

            while (UObject.isValid(funcParmsProperties)) {


                var PropertyFlags = FProperty.getPropertyFlags(funcParmsProperties) as unknown as number;
                if ((PropertyFlags & EPropertyFlags.CPF_ReturnParm) == EPropertyFlags.CPF_ReturnParm) {
                    returnVal = resolveProp(GName, recurrce, funcParmsProperties);
                }
                else {
                    if ((PropertyFlags & EPropertyFlags.CPF_ConstParm) == EPropertyFlags.CPF_ConstParm) {
                        params += "const";
                    }
                    if ((PropertyFlags & EPropertyFlags.CPF_OutParm) == EPropertyFlags.CPF_OutParm) {
                        params += "out";
                    }
                    if ((PropertyFlags & EPropertyFlags.CPF_ReferenceParm) == EPropertyFlags.CPF_ReferenceParm) {
                        params += "ref";
                    }
                    params += resolveProp(GName, recurrce, funcParmsProperties);
                    params += " ";
                    params += FField.getName(GName, funcParmsProperties);
                    params += ", ";
                }
                funcParmsProperties = FField.getNext(funcParmsProperties);
            }
            if (params.length > 0) {
                params = params.slice(0, -2);
            }

            var thisFuncFlags = UFunction.getFunctionFlags(prop) as unknown as number;
            for (let mapping of funcFlags) {
                if ((thisFuncFlags & mapping.flag) == mapping.flag) {
                    flags += `${mapping.name}|`
                }
            }
            // for(let mapping of EFunctionFlags)
            file.write(`\t${returnVal} ${thisFieldName}(${params}); //Addr ${UFunction.getFunc(prop)} ${flags !== "" ? ("[" + flags.slice(0, -1) + "]") : ""} ${("// UFieldProperty addr: " + children)}\n`);
        }
        else if (className === "Class" || className === "Package") {
        }
        else {
            file.write(`\t${className} ${thisFieldName}; //[Size: ${FProperty.getElementSize(prop)}]\n`);

        }
        file.flush()
        children = UField.getNext(children);
    }
}

export function writeStruct(GName: NativePointer, clazz: UClassPointer, isActorDump: boolean = true) {
    var currStruct = clazz;
    var name = UObject.getName(GName, currStruct);

    if (name === "None" || (name && name.indexOf("/Game/") > -1) || (name && name.indexOf("_png") > -1) || name === "") {
        return;
    }

    if (isActorDump) {
        if (UStruct.getStructClassPath(GName, currStruct) === "Actor.Object") {
            file.write(`Name: ${name}, Addr: ${currStruct}\n`);
            writeStructChild(GName, UStruct.getChildProperties(currStruct))
            writeStructFunc(GName, UStruct.getChildren(currStruct))
            return;
        }
    }
    else {
        file.write(`Class: ${UStruct.getStructClassPath(GName, currStruct)}, Addr: ${currStruct}\n`);
        writeStructChild(GName, UStruct.getChildProperties(currStruct))
        writeStructFunc(GName, UStruct.getChildren(currStruct))
    }
}