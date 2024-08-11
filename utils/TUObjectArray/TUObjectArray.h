#ifndef TUOBJECT_H
#define TUOBJECT_H

#include <stdint.h>

#include "../FUObjectItem/FUObjectItem.h"

class TUObject
{
public:
    enum
    {
        NumElementsPerChunk = 64 * 1024,
    };

    /** Master table to chunks of pointers **/
    FUObjectItem **Objects;
    /** If requested, a contiguous memory where all objects are allocated **/
    FUObjectItem *PreAllocatedObjects;
    /** Maximum number of elements **/
    uint32_t MaxElements;
    /** Number of elements we currently have **/
    uint32_t NumElements;
    /** Maximum number of chunks **/
    uint32_t MaxChunks;
    /** Number of chunks we currently have **/
    uint32_t NumChunks;
};

#endif