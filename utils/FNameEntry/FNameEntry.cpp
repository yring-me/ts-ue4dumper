#include "FNameEntry.h"
#include "../GAME.h"

extern "C" int32_t get_FNameEntry_String_Offset()
{
    return offsetof(FNameEntry, AnsiName);
}

extern "C" int32_t get_FNameEntry_Header_Offset()
{
    return offsetof(FNameEntry, Header);
}

extern "C" int32_t get_FNameEntry_LenBit()
{
#ifdef COM_NETEASE_RACE
    return 1;
#endif

    return 6;
}