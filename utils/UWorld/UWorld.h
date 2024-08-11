#ifndef UWORLD_H
#define UWORLD_H

#include <stdint.h>
#include "../UObject/UObject.h"
#include "../ULevel/ULevel.h"

class FNetworkNotify
{
    uint64_t VTable;
};
class UWorld : public UObject, public FNetworkNotify
{
public:
    ULevel *PersistentLevel;
};

#endif