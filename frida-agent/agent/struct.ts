import * as OFFSET from "./offset.js";
import { getFNameFromID } from "./utils.js";
export type FFieldPointer = NativePointer;
export type UFiledPointer = NativePointer;
export type UStructPointer = NativePointer;
export type UClassPointer = NativePointer;
export type UObjectPointer = NativePointer;
export type FPropertyPointer = NativePointer;
export type UEnumPropertyPointer = NativePointer;
export type UEnumPointer = NativePointer;
export type UPropertyPointer = NativePointer;
export type UFunctionPointer = NativePointer;
export type FNamePointer = NativePointer;

export var UObject = {
    /**
     * 
     * @param obj 
     * @returns UClass* Returns the UClass that defines the fields of this object
     */
    getClass: function (obj: UObjectPointer) {
        var classPrivate = obj.add(OFFSET.offset_UObject_ClassPrivate).readPointer(); //得到所属类
        // console.log(`classPrivate: ${classPrivate}`);
        return classPrivate;
    },

    /**
     * 
     * @param obj 
     * @returns ComparsionIndex Returns the logical name index of this object
     */
    getNameId: function (obj: UObjectPointer) {
        // console.log(`obj: ${obj}`);
        try {
            var nameId = obj.add(OFFSET.offset_UObject_ComparisonIndex).readU32(); //读取ComparisonIndex，此成员只有一个uint32的值
            // console.log(`nameId: ${nameId}`);
            return nameId;
        } catch (e) {
            return 0;
        }
    },

    /**
     * 
     * @param GName 
     * @param obj 
     * @returns string Returns the logical name of this object
     */
    getName: function (GName: NativePointer, obj: UObjectPointer) {
        if (this.isValid(obj)) {
            return getFNameFromID(GName, this.getNameId(obj));
        } else {
            return "Invalid-None";
        }
    },

    /**
     * 
     * @param GName 
     * @param obj 
     * @returns string Returns the UClass name that defines the fields of this object
     */
    getClassName: function (GName: NativePointer, obj: UObjectPointer) {
        if (this.isValid(obj)) {
            var classPrivate = this.getClass(obj);
            return this.getName(GName, classPrivate);
        } else {
            return "Invalid-None";
        }
    },
    isValid: function (obj: UObjectPointer) {
        var isValid = (obj != null && this.getNameId(obj) > 0 && this.getClass(obj) != null);
        // console.log(`isValid: ${isValid}`);
        return isValid;
    }
}

export var UField = {
    getNext: function (field: UFiledPointer) {//UField*
        // console.log(`field: ${field}`);
        return field.add(OFFSET.offset_UField_Next).readPointer();
    }
}

export var UEnum = {
    /**
     * 
     * @param en UEnumPointer
     * @returns TPair<FName, int64_t>[]
     */
    getTpairArray: function (en: UEnumPointer) {
        return en.add(OFFSET.offset_UEnum_Names).readPointer();
    },
    getCount: function (en: UEnumPointer) {
        return en.add(OFFSET.offset_UEnum_Count).readU32();
    }
}

export var UFunction = {
    getFunctionFlags: function (func: UFunctionPointer) {
        return func.add(OFFSET.offset_UFunction_FunctionFlags).readU32();
    },
    getFunc: function (func: UFunctionPointer) {
        // console.log(`func: ${func}`)
        return func.add(OFFSET.offset_UFunction_Func).readPointer();
    }
};

export var UStruct = {
    /**
     * Struct this inherits from, may be null
     * @param structz
     * @returns UStruct*
     *  */
    getSuperClass: function (structz: UStructPointer) {//UStruct*
        // console.log(`UStruct.getSuperClass structz: ${structz}`);
        return structz.add(OFFSET.offset_UStruct_SuperStruct).readPointer()
    },

    /**
     *  
     * @param structz
     * @returns UField* Children:该结构体的方法
     *  */
    getChildren: function (structz: UStructPointer) {//UField*
        // console.log(`UStruct.getChildren structz: ${structz}`);
        return structz.add(OFFSET.offset_UStruct_Children).readPointer();
    },

    /**
     *  
     * @param structz 
     * @returns FField* ChildProperties:该结构体的属性
     */
    getChildProperties: function (structz: UStructPointer) {//UField*
        // console.log(`UStruct.getChildProperties structz: ${structz}`);
        return structz.add(OFFSET.offset_UStruct_ChildProperties).readPointer();
    },

    getClassName: function (GName: NativePointer, clazz: UObjectPointer) {
        return UObject.getName(GName, clazz);
    },


    getClassPath: function (GName: NativePointer, object: UObjectPointer) {
        var clazz = UObject.getClass(object);
        var classname = UObject.getName(GName, clazz);
        var superclass = this.getSuperClass(clazz);
        while (UObject.isValid(superclass)) {
            if (classname == null)
                break;
            classname += ".";
            classname += UObject.getName(GName, superclass);

            superclass = this.getSuperClass(superclass);
        }

        return classname;
    },

    /**
     *  getStructClassPath:获取结构体的类路径，完全类限定符
     *  */
    getStructClassPath: function (GName: NativePointer, clazz: UObjectPointer) {
        var classname = UObject.getName(GName, clazz);

        var superclass = this.getSuperClass(clazz);
        while (UObject.isValid(superclass)) {
            if (classname == null)
                break;
            classname += ".";
            classname += UObject.getName(GName, superclass);

            superclass = this.getSuperClass(superclass);
        }

        return classname;
    }
}


export var FField = {
    /**
     * 
     * @param GName 
     * @param FField 
     * @returns Name of this field
     */
    getName: function (GName: NativePointer, FField: FFieldPointer) {
        return getFNameFromID(GName, FField.add(OFFSET.offset_FField_Name).readU32());
    },

    /**
     * 
     * @param GName 
     * @param FField 
     * @returns  Name of the class object representing the type of this FField 
     */
    getClassName: function (GName: NativePointer, FField: FFieldPointer) {
        return getFNameFromID(GName, FField.add(OFFSET.offset_FField_Class).readPointer().readU32());
    },

    /**
     * 
     * @param FField 
     * @returns UField* Next Field in the linked list
     */
    getNext: function (FField: FFieldPointer) {//UField*
        return FField.add(OFFSET.offset_FField_Next).readPointer();
    }
};

export var UObjectProperty = {
    /**
     * @param prop 
     * @returns FProperty* the class that subscribes to this property
     */
    getPropertyClass: function (prop: FFieldPointer) {
        return prop.add(OFFSET.offset_FProperty_size).readPointer();
    }
};

export var FProperty = {
    getElementSize: function (prop: FPropertyPointer) {
        return prop.add(OFFSET.offset_FProperty_ElementSize).readU32();
    },
    getPropertyFlags: function (prop: FPropertyPointer) {
        return prop.add(OFFSET.offset_FProperty_PropertyFlags).readU64()
    },
    getOffset: function (prop: FPropertyPointer) {
        return prop.add(OFFSET.offset_FProperty_OffsetInternal).readU32();
    }
};

export var UClassProperty = {
    getMetaClass: function (prop: FFieldPointer) {
        return prop.add(OFFSET.offset_FClassProperty_MetaClass).readPointer();
    }
};

export var UInterfaceProperty = {
    getInterfaceClass: function (prop: FFieldPointer) {
        return prop.add(OFFSET.offset_FInterfaceProperty_InterfaceClass).readPointer();
    }
};

export var UStructProperty = {
    getStruct: function (prop: FFieldPointer) {
        return prop.add(OFFSET.offset_FStructProperty_Struct).readPointer();
    }
};

export var UArrayProperty = {
    getInner: function (prop: FFieldPointer) {//UProperty*
        return prop.add(OFFSET.offset_FArrayProperty_InnerProperty).readPointer();
    }
};

export var USetProperty = {
    getElementProp: function (prop: FFieldPointer) {//UProperty*
        return prop.add(OFFSET.offset_FSetProperty_ElementProp).readPointer();
    }
};

export var UMapProperty = {
    getKeyProp: function (prop: FFieldPointer) {//UProperty*
        return prop.add(OFFSET.offset_FMapProperty_KeyProp).readPointer();
    },
    getValueProp: function (prop: FFieldPointer) {//UProperty*
        return prop.add(OFFSET.offset_FMapProperty_ValueProp).readPointer();
    }
};

export var UByteProperty = {
    getEnum: function (prop: FFieldPointer) {
        return prop.add(OFFSET.offset_FProperty_size).readPointer();
    },
    getName: function (Gname: NativePointer, prop: FFieldPointer) {
        return UObject.getName(Gname, this.getEnum(prop));
    }
}

export var UEnumProperty = {
    getEnum: function (prop: UEnumPointer) {
        return prop.add(OFFSET.offset_UEnumProperty_EnumClass).readPointer();
    },
    getName: function (Gname: NativePointer, prop: UEnumPointer) {
        return UObject.getName(Gname, this.getEnum(prop));
    }
}

/** EFunctionFlags set defined for this function */
export enum EFunctionFlags {
    // Function flags.
    FUNC_None = 0x00000000,

    FUNC_Final = 0x00000001,	                // Function is final (prebindable, non-overridable function).
    FUNC_RequiredAPI = 0x00000002,	            // Indicates this function is DLL exported/imported.
    FUNC_BlueprintAuthorityOnly = 0x00000004,   // Function will only run if the object has network authority
    FUNC_BlueprintCosmetic = 0x00000008,        // Function is cosmetic in nature and should not be invoked on dedicated servers
    // FUNC_				= 0x00000010,       // unused.
    // FUNC_				= 0x00000020,       // unused.
    FUNC_Net = 0x00000040,                      // Function is network-replicated.
    FUNC_NetReliable = 0x00000080,              // Function should be sent reliably on the network.
    FUNC_NetRequest = 0x00000100,	            // Function is sent to a net service
    FUNC_Exec = 0x00000200,	                    // Executable from command line.
    FUNC_Native = 0x00000400,	                // Native function.
    FUNC_Event = 0x00000800,                    // Event function.
    FUNC_NetResponse = 0x00001000,              // Function response from a net service
    FUNC_Static = 0x00002000,                   // Static function.
    FUNC_NetMulticast = 0x00004000,	            // Function is networked multicast Server -> All Clients
    FUNC_UbergraphFunction = 0x00008000,        // Function is used as the merge 'ubergraph' for a blueprint, only assigned when using the persistent 'ubergraph' frame
    FUNC_MulticastDelegate = 0x00010000,	    // Function is a multi-cast delegate signature (also requires FUNC_Delegate to be set!)
    FUNC_Public = 0x00020000,	                // Function is accessible in all classes (if overridden, parameters must remain unchanged).
    FUNC_Private = 0x00040000,	                // Function is accessible only in the class it is defined in (cannot be overridden, but function name may be reused in subclasses.  IOW: if overridden, parameters don't need to match, and Super.Func() cannot be accessed since it's private.)
    FUNC_Protected = 0x00080000,	            // Function is accessible only in the class it is defined in and subclasses (if overridden, parameters much remain unchanged).
    FUNC_Delegate = 0x00100000,	                // Function is delegate signature (either single-cast or multi-cast, depending on whether FUNC_MulticastDelegate is set.)
    FUNC_NetServer = 0x00200000,	            // Function is executed on servers (set by replication code if passes check)
    FUNC_HasOutParms = 0x00400000,	            // function has out (pass by reference) parameters
    FUNC_HasDefaults = 0x00800000,	            // function has structs that contain defaults
    FUNC_NetClient = 0x01000000,	            // function is executed on clients
    FUNC_DLLImport = 0x02000000,	            // function is imported from a DLL
    FUNC_BlueprintCallable = 0x04000000,	    // function can be called from blueprint code
    FUNC_BlueprintEvent = 0x08000000,	        // function can be overridden/implemented from a blueprint
    FUNC_BlueprintPure = 0x10000000,	        // function can be called from blueprint code, and is also pure (produces no side effects). If you set this, you should set FUNC_BlueprintCallable as well.
    FUNC_EditorOnly = 0x20000000,	            // function can only be called from an editor scrippt.
    FUNC_Const = 0x40000000,	                // function can be called from blueprint code, and only reads state (never writes state)
    FUNC_NetValidate = 0x80000000,	            // function must supply a _Validate implementation

    FUNC_AllFlags = 0xFFFFFFFF,
};

export var funcFlags = [
    { flag: 0x00000001, name: "Final" },   // Function is final (prebindable, non-overridable function).
    { flag: 0x00000004, name: "BlueprintAuthorityOly" },   // Function will only run if the object has network authority
    { flag: 0x00000008, name: "BlueprinCosmetic" },    // Function is cosmetic in nature and should not be invoked on dedicated servers
    { flag: 0x00000400, name: "Native" },  // Native function.
    { flag: 0x00000800, name: "Event" },   // Event function.
    { flag: 0x00002000, name: "Static" },  // Static function.
    { flag: 0x00008000, name: "UbergraphFunction" },   // Function is used as the merge 'ubergraph' for a blueprint, only assigned when using the persistent 'ubergraph' frame
    { flag: 0x00010000, name: "MulticastDlegate" },    // Function is a multi-cast delegate signature (also requires FUNC_Delegate to be set!)
    { flag: 0x00100000, name: "Delegate" },    // Function is delegate signature (either single-cast or multi-cast, depending on whether FUNC_MulticastDelegate is set.)
    { flag: 0x04000000, name: "BlueprintCallabl" },    // function can be called from blueprint code
    { flag: 0x08000000, name: "BlueprintEvent" },  // function can be overridden/implemented from a blueprint
    { flag: 0x10000000, name: "BlueprintPure" },    // function can be called from blueprint code, and is also pure (produces no side effects). If you set this, you should set FUNC_BlueprintCallable as well.
    { flag: 0x20000000, name: "EditorOnly" },  // function can only be called from an editor scrippt.
    { flag: 0x40000000, name: "Const" },   // function can be called from blueprint code, and only reads state (never writes state)
]

/**
 * Flags associated with each property in a class, overriding the
 * property's default behavior.
 * @warning When adding one here, please update ParsePropertyFlags()
 */
export enum EPropertyFlags {
    CPF_None = 0,

    CPF_Edit = 0x0000000000000001,	                            ///< Property is user-settable in the editor.
    CPF_ConstParm = 0x0000000000000002,	                        ///< This is a constant function parameter
    CPF_BlueprintVisible = 0x0000000000000004,      	        ///< This property can be read by blueprint code
    CPF_ExportObject = 0x0000000000000008,	                    ///< Object can be exported with actor.
    CPF_BlueprintReadOnly = 0x0000000000000010,	                ///< This property cannot be modified by blueprint code
    CPF_Net = 0x0000000000000020,	                            ///< Property is relevant to network replication.
    CPF_EditFixedSize = 0x0000000000000040,     	            ///< Indicates that elements of an array can be modified, but its size cannot be changed.
    CPF_Parm = 0x0000000000000080,	                            ///< Function/When call parameter.
    CPF_OutParm = 0x0000000000000100,	                        ///< Value is copied out after function call.
    CPF_ZeroConstructor = 0x0000000000000200,	                ///< memset is fine for construction
    CPF_ReturnParm = 0x0000000000000400,	                    ///< Return value.
    CPF_DisableEditOnTemplate = 0x0000000000000800,	            ///< Disable editing of this property on an archetype/sub-blueprint
    //CPF_      				= 0x0000000000001000,       	///< 
    CPF_Transient = 0x0000000000002000,	                        ///< Property is transient: shouldn't be saved or loaded, except for Blueprint CDOs.
    CPF_Config = 0x0000000000004000,	                        ///< Property should be loaded/saved as permanent profile.
    //CPF_						= 0x0000000000008000,	        ///< 
    CPF_DisableEditOnInstance = 0x0000000000010000,	            ///< Disable editing on an instance of this class
    CPF_EditConst = 0x0000000000020000,	                        ///< Property is uneditable in the editor.
    CPF_GlobalConfig = 0x0000000000040000,	                    ///< Load config from base class, not subclass.
    CPF_InstancedReference = 0x0000000000080000,	            ///< Property is a component references.
    //CPF_						= 0x0000000000100000,	        ///<
    CPF_DuplicateTransient = 0x0000000000200000,	            ///< Property should always be reset to the default value during any type of duplication (copy/paste, binary duplication, etc.)
    //CPF_						= 0x0000000000400000,	        ///< 
    //CPF_    					= 0x0000000000800000,	        ///< 
    CPF_SaveGame = 0x0000000001000000,	                        ///< Property should be serialized for save games, this is only checked for game-specific archives with ArIsSaveGame
    CPF_NoClear = 0x0000000002000000,	                        ///< Hide clear (and browse) button.
    //CPF_  					= 0x0000000004000000,	        ///<
    CPF_ReferenceParm = 0x0000000008000000,	                    //< Value is passed by reference; CPF_OutParam and CPF_Param should also be set.
    CPF_BlueprintAssignable = 0x0000000010000000,	            ///< MC Delegates only.  Property should be exposed for assigning in blueprint code
    CPF_Deprecated = 0x0000000020000000,	                    ///< Property is deprecated.  Read it from an archive, but don't save it.
    CPF_IsPlainOldData = 0x0000000040000000,	                ///< If this is set, then the property can be memcopied instead of CopyCompleteValue / CopySingleValue
    CPF_RepSkip = 0x0000000080000000,	                        ///< Not replicated. For non replicated properties in replicated structs 
    CPF_RepNotify = 0x0000000100000000,	                        ///< Notify actors when a property is replicated
    CPF_Interp = 0x0000000200000000,	                        ///< interpolatable property for use with matinee
    CPF_NonTransactional = 0x0000000400000000,	                ///< Property isn't transacted
    CPF_EditorOnly = 0x0000000800000000,	                    ///< Property should only be loaded in the editor
    CPF_NoDestructor = 0x0000001000000000,	                    ///< No destructor
    //CPF_						= 0x0000002000000000,	        ///<
    CPF_AutoWeak = 0x0000004000000000,	                        ///< Only used for weak pointers, means the export type is autoweak
    CPF_ContainsInstancedReference = 0x0000008000000000,        ///< Property contains component references.
    CPF_AssetRegistrySearchable = 0x0000010000000000,	        ///< asset instances will add properties with this flag to the asset registry automatically
    CPF_SimpleDisplay = 0x0000020000000000,	                    ///< The property is visible by default in the editor details view
    CPF_AdvancedDisplay = 0x0000040000000000,	                ///< The property is advanced and not visible by default in the editor details view
    CPF_Protected = 0x0000080000000000,	                        ///< property is protected from the perspective of script
    CPF_BlueprintCallable = 0x0000100000000000,	                ///< MC Delegates only.  Property should be exposed for calling in blueprint code
    CPF_BlueprintAuthorityOnly = 0x0000200000000000,	        ///< MC Delegates only.  This delegate accepts (only in blueprint) only events with BlueprintAuthorityOnly.
    CPF_TextExportTransient = 0x0000400000000000,	            ///< Property shouldn't be exported to text format (e.g. copy/paste)
    CPF_NonPIEDuplicateTransient = 0x0000800000000000,	        ///< Property should only be copied in PIE
    CPF_ExposeOnSpawn = 0x0001000000000000,	                    ///< Property is exposed on spawn
    CPF_PersistentInstance = 0x0002000000000000,	            ///< A object referenced by the property is duplicated like a component. (Each actor should have an own instance.)
    CPF_UObjectWrapper = 0x0004000000000000,	                ///< Property was parsed as a wrapper class like TSubclassOf<T>, FScriptInterface etc., rather than a USomething*
    CPF_HasGetValueTypeHash = 0x0008000000000000,	            ///< This property can generate a meaningful hash value.
    CPF_NativeAccessSpecifierPublic = 0x0010000000000000,	    ///< Public native access specifier
    CPF_NativeAccessSpecifierProtected = 0x0020000000000000,	///< Protected native access specifier
    CPF_NativeAccessSpecifierPrivate = 0x0040000000000000,	    ///< Private native access specifier
    CPF_SkipSerialization = 0x0080000000000000,	                ///< Property shouldn't be serialized, can still be exported to text
};

