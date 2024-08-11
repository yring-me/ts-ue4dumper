#ifndef FFIELD_H
#define FFIELD_H

#include "stdint.h"
#include "../FName/FName.h"
#include "../UObject/UObject.h"

class FField;

class FFieldClass
{
public:
    FName Name; //
    uint64_t Id;
    uint64_t CastFlags;
    uint64_t ClassFlags;
    FFieldClass *SuperClass;
    FField *DefaultObject;
};

class FFieldVariant
{
public:
    union FFieldObjectUnion
    {
        FField *Field;
        UObject *Object;
    } Container;
    uint64_t bIsUObject;
};

#pragma pack(8)
class FField
{
public:
    uint64_t VTable;

    FFieldClass *ClassPrivate; // 类名，用于区分FProperty类型
    FFieldVariant Owner;

    FField *Next;      // 指向下一个FField
    FName NamePrivate; // 属性名称
    uint32_t FlagsPrivate;
};
#pragma pack()
#endif