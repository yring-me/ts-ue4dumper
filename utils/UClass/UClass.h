#ifndef UCLASS_H
#define UCLASS_H

#include <stdint.h>
#include <stddef.h>

#include "../UStruct/UStruct.h"

class UStruct;

class UClass : public UStruct
{
    uint64_t PVOID_;
};

#endif