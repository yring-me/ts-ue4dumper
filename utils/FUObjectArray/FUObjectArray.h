#ifndef FUOBJECTARRAY_H
#define FUOBJECTARRAY_H

#include <stdint.h>

#pragma pack(8)
class FUObjectArray
{
public:
    uint32_t ObjFirstGCIndex;
    uint32_t ObjLastNonGCIndex;
    uint32_t MaxObjectsNotConsideredByGC;

    bool OpenForDisregardForGC;

    uint64_t TUObjectArray;
};
#pragma pack()

#endif