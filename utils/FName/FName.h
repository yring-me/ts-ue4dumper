#ifndef FNAME_H
#define FNAME_H
#include <stdint.h>
#include <stddef.h>

typedef void *PVOID;
#pragma pack(4)
class FName
{
public:
    uint32_t ComparisonIndex;
    uint32_t Number;
};
#pragma pack()

class FNameEntry
{
public:
};

#endif