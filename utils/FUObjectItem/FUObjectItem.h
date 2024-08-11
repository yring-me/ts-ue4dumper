#ifndef FUOBJECTITEM_H
#define FUOBJECTITEM_H

#include "../UObject/UObject.h"

#pragma pack(8)
class FUObjectItem
{
    class UObject *Object;
    uint32_t Flags;
    // UObject Owner Cluster Index
    uint32_t ClusterRootIndex;
    // Weak Object Pointer Serial number associated with the object
    uint32_t SerialNumber;
};
#pragma pack(0)
#endif