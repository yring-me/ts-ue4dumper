#ifndef UOBJECT_H
#define UOBJECT_H

#include <stdint.h>
#include <stddef.h>
#include "../FName/FName.h"
class UClass;

typedef void *PVOID;
#pragma pack(8)
class UObject
{
public:
    uint64_t VTable;
    uint32_t ObjectFlags;
    uint32_t InternalIndex;
    UClass *ClassPrivate;
    FName NamePrivate;
    UObject *OuterPrivate;
};

#pragma pack()
#endif