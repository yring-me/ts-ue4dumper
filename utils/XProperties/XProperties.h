#ifndef XPROPERTIES_H
#define XPROPERTIES_H

#include "../FProperty/FProperty.h"
#include "../FField/FField.h"
#include "../TArray/TArray.h"
#include "../FString/FString.h"
#include "../UStruct/UStruct.h"
#include "../UEnum/UEnum.h"

// FObjectProperty
class FObjectProperty : public FProperty
{
public:
    UClass *PropertyClass;
};

// UScriptStruct
class UScriptStruct : public UStruct
{
};

// FStructProperty
class FStructProperty : public FProperty
{
public:
    UScriptStruct *Struct;
};

// FObjectProperty
class FObjectProperty : public FProperty
{
public:
    UClass *PropertyClass;
};

// FByteProperty
class FByteProperty : public FProperty
{
public:
    UEnum *Enum;
};

// FFieldPathProperty
class FFieldPathProperty : public FProperty
{
public:
    FFieldClass *PropertyClass;
};

// FBoolProperty
class FBoolProperty : public FProperty
{
public:
    /** Size of the bitfield/bool property. Equal to ElementSize but used to check if the property has been properly initialized (0-8, where 0 means uninitialized). */
    uint8_t FieldSize;
    /** Offset from the memeber variable to the byte of the property (0-7). */
    uint8_t ByteOffset;
    /** Mask of the byte with the property value. */
    uint8_t ByteMask;
    /** Mask of the field with the property value. Either equal to ByteMask or 255 in case of 'bool' type. */
    uint8_t FieldMask;
};

// FSetProperty
class FSetProperty : public FProperty
{
public:
    FProperty *ElementProp;
};

// FWeakObjectProperty
class FWeakObjectProperty : public FObjectProperty
{
};

// FLazyObjectProperty
class FLazyObjectProperty : public FObjectProperty
{
};

// FArrayProperty
class FArrayProperty : public FProperty
{
public:
    FProperty *Inner;
};

// FMapProperty
class FMapProperty : public FProperty
{
public:
    FProperty *KeyProp;
    FProperty *ValueProp;
};

// FClassProperty
class FClassProperty : public FObjectProperty
{
public:
    UClass *MetaClass;
};

// FEnumProperty
class FEnumProperty : public FProperty
{
public:
    FProperty *UnderlyingProp; // The property which represents the underlying type of the enum
    UEnum *Enum;
};

// FInterfaceProperty
class FInterfaceProperty : public FProperty
{
public:
    UClass *InterfaceClass;
};

#endif