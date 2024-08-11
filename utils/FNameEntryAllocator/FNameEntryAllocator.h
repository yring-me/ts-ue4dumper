#ifndef FNAMEENTRYALLOCATOR_H
#define FNAMEENTRYALLOCATOR_H

#include "../FNameEntry/FNameEntry.h"
typedef uint64_t PVOID;

static constexpr uint32_t FNameMaxBlockBits = 13; // Limit block array a bit, still allowing 8k * block size = 1GB - 2G of FName entry data
static constexpr uint32_t FNameBlockOffsetBits = 16;
static constexpr uint32_t FNameMaxBlocks = 1 << FNameMaxBlockBits;
static constexpr uint32_t FNameBlockOffsets = 1 << FNameBlockOffsetBits;
static constexpr uint32_t ProbeHashBits = 5;

class FNameEntryAllocator
{
public:
    enum
    {
        Stride = alignof(FNameEntry)
    };
    enum
    {
        BlockSizeByte = Stride * FNameBlockOffsets
    };

    char lock[0x38];
    uint32_t CurrenBlock;
    uint32_t CurrentByteCursor;
    FNameEntry *Blocks[FNameMaxBlocks];
};

#endif