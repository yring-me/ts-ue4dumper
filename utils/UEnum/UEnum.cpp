#include "UEnum.h"
#include "../GAME.h"

#pragma GCC diagnostic ignored "-Winvalid-offsetof"
extern "C" int get_UEnum_CppType_Offset()
{
    return offsetof(UEnum, CppType);
}

extern "C" int get_UEnum_Names_Offset()
{
    return offsetof(UEnum, Names);
}

extern "C" int get_UEnum_Names_Size()
{
#ifdef COM_NETEASE_RACE
    return sizeof(TArray<TPair<FName, int64_t>>) + 8;
#endif
    return sizeof(TArray<TPair<FName, int64_t>>);
}