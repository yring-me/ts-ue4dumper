#ifndef UENUM_H
#define UENUM_H

#include "../UField/UField.h"
#include "../TArray/TArray.h"
#include "../FString/FString.h"
#include "../GAME.h"
template <typename KeyType, typename ValueType>
struct TPair
{
    KeyType Key;
    ValueType Value;
};

class UEnum : public UField
{
public:
    FString CppType;

#ifdef COM_NETEASE_RACE
    char dummy[0x10];
#endif

    TArray<TPair<FName, int64_t>> Names;
};

#endif