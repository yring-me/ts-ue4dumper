#ifndef USTRUCT_H
#define USTRUCT_H

#include "../UField/UField.h"
#include "../TArray/TArray.h"
#include "../FField/FField.h"
#include "../FProperty/FProperty.h"
#include "../GAME.h"

class FStructBaseChain
{
public:
#ifdef COM_NETEASE_RACE
    char dummy2[16];
#endif

    FStructBaseChain **StructBaseChainArray;
    int32_t NumStructBasesInChainMinusOne;
};

class UStruct : public UField, private FStructBaseChain
{
public:
    UStruct *SuperStruct;    // 该结构体的超类
    UField *Children;        // 结构体中的方法
    FField *ChildProperties; // 结构体中的属性
    int32_t PropertiesSize;  // 属性占用大小
    int32_t MinAlignment;

    TArray<PVOID> Script;

    FProperty *PropertyLink;
    FProperty *RefLink;
    FProperty *DestructorLink;
    FProperty *PostConstructLink;
    TArray<PVOID> ScriptAndPropertyObjectReferences;
    TArray<PVOID> *UnresolvedScriptProperties;
    PVOID unknown;
};

#endif