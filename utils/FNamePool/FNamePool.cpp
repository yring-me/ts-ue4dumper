#include "FNamePool.h"
#include "../GAME.h"
extern "C" int32_t get_FNamePool_Stride()
{
#ifdef COM_NETEASE_RACE
    return 4;
#endif
    // return FNameEntryAllocator::Stride;
    return 2;
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