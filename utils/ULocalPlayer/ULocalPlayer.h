#ifndef UPLAYER_H
#define UPLAYER_H

#include <stdint.h>
#include "../UObject/UObject.h"

class UPlayer : public UObject
{
public:
    uint64_t dummy;
    uint64_t *PlayerController;
};

class ULocalPlayer : public UPlayer
{
public:
    uint64_t dummy;
};
#endif