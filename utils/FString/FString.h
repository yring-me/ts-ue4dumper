#ifndef FSTRING_H
#define FSTRING_H

#include "../TArray/TArray.h"

#include <stdint.h>
typedef wchar_t TCHAR, *PTCHAR;

class FString
{
public:
    TArray<TCHAR> Data;
};

#endif