var offset_so = Module.load('/data/local/tmp/libUE4Offset.so');
var func: NativePointer;
var getOffsets;

// Global Offset
func = offset_so.findExportByName("get_GNames_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var GNames_offset = getOffsets();

func = offset_so.findExportByName("get_GWorld_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var GWorld_offset = getOffsets();

func = offset_so.findExportByName("get_GUObjectArray_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var GUObjectArray_offset = getOffsets();

//UObejct
func = offset_so.findExportByName("get_UObject_VTable_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UObject_VTable = getOffsets();

func = offset_so.findExportByName("get_UObject_ObjectFlags_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UObject_ObjectFlags = getOffsets()

func = offset_so.findExportByName("get_UObject_InternalIndex_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UObject_InternalIndex = getOffsets()

func = offset_so.findExportByName("get_UObject_ClassPrivate_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UObject_ClassPrivate = getOffsets()

func = offset_so.findExportByName("get_UObject_NamePrivate_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UObject_NamePrivate = getOffsets()

func = offset_so.findExportByName("get_UObject_ComparisonIndex_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
// console.log("get_UObject_ComparisonIndex_Offset", getOffsets())
export var offset_UObject_ComparisonIndex = getOffsets()

func = offset_so.findExportByName("get_UObject_Number_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
// console.log("get_UObject_ComparisonIndex_Offset", getOffsets())
export var offset_UObject_Number = getOffsets()

func = offset_so.findExportByName("get_UObject_OuterPrivate_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
// console.log("get_UObject_OuterPrivate_Offset", getOffsets().toString(16), 32);
export var offset_UObject_OuterPrivate = getOffsets()


//UWorld 
func = offset_so.findExportByName("get_UWorld_PersistentLevel_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UWorld_PersistentLevel = getOffsets()
export var offset_GWorld_GameInstance = 0x180

//ULevel
func = offset_so.findExportByName("get_ULevel_Actors_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_ULevel_Actors = getOffsets()

//GameInstance
func = offset_so.findExportByName("get_UGameInstance_LocalPlayers_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_GameInstance_LocalPlayers = getOffsets()

//ULocalPlayer
func = offset_so.findExportByName("get_ULocalPlayer_PlayerController_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var ULocalPlayer_PlayerController_OFFSET = getOffsets();

//APlayerController
export var GAME_ACKNOWLEDEGED_PAWN_OFFSET = 0x2a0


//Class: UField
func = offset_so.findExportByName("get_UField_Next_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UField_Next = getOffsets();
// console.log("UField_Next", offset_UField_Next.toString(16))

//Class: FName
func = offset_so.findExportByName("get_FName_Size") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var FName_Size = getOffsets();

// FNamePool
func = offset_so.findExportByName("get_FNamePool_Stride") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var FNameStride = getOffsets();

func = offset_so.findExportByName("get_FNamePool_CurrentBlock") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FNamePool_CurrentBlock = getOffsets();

func = offset_so.findExportByName("get_FNamePool_CurrentByteCursor") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FNamePool_CurrentByteCursor = getOffsets();

func = offset_so.findExportByName("get_FNamePool_Blocks") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FNamePool_Blocks = getOffsets();

// FNameEntry
func = offset_so.findExportByName("get_FNameEntry_Header_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FNameEntry_Header_Offset = getOffsets();

func = offset_so.findExportByName("get_FNameEntry_LenBit") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var FNameEntry_LenBit = getOffsets();

func = offset_so.findExportByName("get_FNameEntry_String_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FNameEntry_String = getOffsets();

//Class: UStruct
func = offset_so.findExportByName("get_UStruct_SuperStruct_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UStruct_SuperStruct = getOffsets();

func = offset_so.findExportByName("get_UStruct_Children_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UStruct_Children = getOffsets();

func = offset_so.findExportByName("get_UStruct_ChildProperties_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UStruct_ChildProperties = getOffsets();


func = offset_so.findExportByName("get_UStruct_PropertyLink_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UStruct_PropertyLink = getOffsets();

// console.log("offset_UStruct_ChildProperties: " + offset_UStruct_ChildProperties.toString(16))
//Class: UEnum
func = offset_so.findExportByName("get_UEnum_Names_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UEnum_Names = getOffsets();
// console.log("offset_UEnum_Names: " + offset_UEnum_Names.toString(16))
export var offset_UEnum_Count = offset_UEnum_Names + Process.pointerSize;
export var offset_UEnum_Max = offset_UEnum_Count + 4;

func = offset_so.findExportByName("get_UEnum_Names_Size") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var enumItemSize = getOffsets();
// console.log("enumItemSize: " + enumItemSize.toString(16))

//Class:UFunction
func = offset_so.findExportByName("get_UFunction_FunctionFlags_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UFunction_FunctionFlags = getOffsets()

func = offset_so.findExportByName("get_UFunction_NumParms_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UFunction_NumParms = getOffsets()

func = offset_so.findExportByName("get_UFunction_ParmsSize_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UFunction_ParmsSize = getOffsets()

func = offset_so.findExportByName("get_UFunction_ReturnValueOffset_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UFunction_ReturnValueOffset = getOffsets()

func = offset_so.findExportByName("get_UFunction_RPCId_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UFunction_RPCId = getOffsets()

func = offset_so.findExportByName("get_UFunction_Func_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_UFunction_Func = getOffsets();

//Class: FField 
func = offset_so.findExportByName("get_FField_ClassPrivate_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FField_Class = getOffsets();

func = offset_so.findExportByName("get_FField_Next_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FField_Next = getOffsets();

func = offset_so.findExportByName("get_FField_NamePrivate_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FField_Name = getOffsets();

//Class: FProperty (FProperty in UE4.25+)
func = offset_so.findExportByName("get_FProperty_ArrayDim_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_ArrayDim = getOffsets();

func = offset_so.findExportByName("get_FProperty_ElementSize_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_ElementSize = getOffsets();

func = offset_so.findExportByName("get_FProperty_PropertyFlags_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_PropertyFlags = getOffsets();

func = offset_so.findExportByName("get_FProperty_RepIndex_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_RepIndex = getOffsets();

func = offset_so.findExportByName("get_FProperty_OffsetInternal_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_OffsetInternal = getOffsets();

func = offset_so.findExportByName("get_FProperty_PropertyLinkNext_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_PropertyLinkNext = getOffsets();

func = offset_so.findExportByName("get_FProperty_NextRef_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_NextRef = getOffsets();

func = offset_so.findExportByName("get_FProperty_DestructorLinkNext_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_DestructorLinkNext = getOffsets();

func = offset_so.findExportByName("get_FProperty_PostConstructLinkNext_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_PostConstructLinkNext = getOffsets();

func = offset_so.findExportByName("get_FProperty_Size") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var offset_FProperty_size = getOffsets();
// console.log(offset_FProperty_size.toString(16)); //0x80

//FUObjectArray
func = offset_so.findExportByName("get_FUObjectArray_TUObjectArray_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var GAME_FUObjectArray_TUObjectArray_OFFSET = getOffsets();

//TUObjectArray
func = offset_so.findExportByName("get_TUObject_NumElements_Offset") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var GAME_TUObjectArray_NumElements_OFFSET = getOffsets();

// FUObjectItem
func = offset_so.findExportByName("get_FUObjectItem_Size") as NativePointer;
getOffsets = new NativeFunction(func, 'int', []);
export var GAME_FUOBJECT_ITEM_SIZE = 0x18;

/**
 * All certain properties inherit from FProperty, And we can get the pointer of the property by FFiled's ChildrenProperties,
 * once we get the pointer of the property, then we can get the certain property.
 * By adding the size of the FProperty, depending on the certain property, we can have the pointer that describe this certain property.
 * 
 * for example
 * class FStructProperty : public FProperty
 * {    
 *   public:
 *       UScriptStruct* Struct;
 *  };
 */
//Class: FClassProperty
export var offset_FClassProperty_MetaClass = offset_FProperty_size + Process.pointerSize;

//Class: FInterfaceProperty
export var offset_FInterfaceProperty_InterfaceClass = offset_FProperty_size;

//Class: FStructProperty
export var offset_FStructProperty_Struct = offset_FProperty_size;

//Class: FArrayProperty
export var offset_FArrayProperty_InnerProperty = offset_FProperty_size;

//Class: FSetProperty
export var offset_FSetProperty_ElementProp = offset_FProperty_size;

//Class: FMapProperty
export var offset_FMapProperty_KeyProp = offset_FProperty_size;
export var offset_FMapProperty_ValueProp = offset_FProperty_size + Process.pointerSize;

//Class: FEnumProperty
export var offset_UEnumProperty_EnumClass = offset_FProperty_size + Process.pointerSize;

