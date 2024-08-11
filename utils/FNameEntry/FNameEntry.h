#ifndef FNAMEENTRY_H
#define FNAMEENTRY_H

#include <stdint.h>
#include <stddef.h>
#include "../GAME.h"

enum
{
    NAME_SIZE = 1024
};

class FNameEntryHeader
{
public:
    uint16_t bIsWide : 1;
    uint16_t Len : 15;
};

#pragma pack(push, 1)
class FNameEntry
{
public:
#ifdef COM_NETEASE_RACE
    char dummy[4];
#endif

    FNameEntryHeader Header;

    union
    {
        char AnsiName[NAME_SIZE];
        wchar_t WideName[NAME_SIZE];
    };
};

#pragma pack(pop)

#endif