#include "FNamePool.h"

extern "C" int32_t get_FNamePool_Stride()
{
    // return FNameEntryAllocator::Stride;
    return 4;
}

extern "C" int32_t get_FNamePool_CurrentBlock()
{
    return offsetof(FNamePool, Entries.CurrenBlock);
}

extern "C" int32_t get_FNamePool_CurrentByteCursor()
{
    return offsetof(FNamePool, Entries.CurrentByteCursor);
}

extern "C" int32_t get_FNamePool_Blocks()
{
    return offsetof(FNamePool, Entries.Blocks);
}