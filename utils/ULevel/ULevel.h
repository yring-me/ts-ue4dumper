#ifndef ULEVEL_H
#define ULEVEL_H

#include <stdint.h>
#include "../UObject/UObject.h"
#include "../TArray/TArray.h"
class AActor;

class IInterface_AssetUserData
{
    uint64_t dummy;
};

class ULevel : public UObject, public IInterface_AssetUserData
{
public:
    char dummyURL[104];
    TArray<AActor *> Actors;
};

#endif