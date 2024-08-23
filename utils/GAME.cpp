#include "GAME.h"
#include <stdint.h>

#ifdef COM_NETEASE_RACE

// com.netease.race
uint64_t GNames_offset = 0x15D458C0;
uint64_t GWorld_offset = 0x15F1CE60;
uint64_t GUObjectArray_offset = 0x15DA0788;

#else
// com.ShuiSha.FPS2
uint64_t GNames_offset = 0xAE7B500;
uint64_t GWorld_offset = 0xB036900;
uint64_t GUObjectArray_offset = 0xAEBF7D8;
#endif

extern "C" int get_GNames_Offset()
{
    return GNames_offset;
}

extern "C" int get_GWorld_Offset()
{
    return GWorld_offset;
}

extern "C" int get_GUObjectArray_Offset()
{
    return GUObjectArray_offset;
}