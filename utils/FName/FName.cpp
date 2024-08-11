#include "FName.h"
int FName_offset[10] = {0};

extern "C" int32_t get_FName_ComparisonIndex_Offset()
{
    return offsetof(FName, ComparisonIndex);
}

extern "C" int32_t get_FName_Number_Offset()
{
    return offsetof(FName, Number);
}

extern "C" int32_t get_FName_Size()
{
    return sizeof(FName);
}
// extern "C"