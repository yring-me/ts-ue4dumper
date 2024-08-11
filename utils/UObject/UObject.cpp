#include "UObject.h"
extern "C" int32_t get_UObject_VTable_Offset()
{
    return offsetof(UObject, VTable);
}

extern "C" int32_t get_UObject_ObjectFlags_Offset()
{
    return offsetof(UObject, ObjectFlags);
}

extern "C" int32_t get_UObject_InternalIndex_Offset()
{
    return offsetof(UObject, InternalIndex);
}

extern "C" int32_t get_UObject_ClassPrivate_Offset()
{
    return offsetof(UObject, ClassPrivate);
}

extern "C" int32_t get_UObject_NamePrivate_Offset()
{
    return offsetof(UObject, NamePrivate);
}
extern "C" int32_t get_UObject_ComparisonIndex_Offset()
{
    return offsetof(UObject, NamePrivate.ComparisonIndex);
}

extern "C" int32_t get_UObject_Number_Offset()
{
    return offsetof(UObject, NamePrivate.Number);
}

// extern "C" int32_t get_UObject_dummy_Offset()
// {
//     return offsetof(UObject, dummy);
// }

extern "C" int32_t get_UObject_OuterPrivate_Offset()
{
    return offsetof(UObject, OuterPrivate);
}