#ifndef UGAMEINSTANCE_H
#define UGAMEINSTANCE_H

#include <stdint.h>

#include "../UObject/UObject.h"

class FExec
{
public:
    uint64_t VTable;
};
class UGameInstance : public UObject, public FExec
{
public:
    uint64_t *WorldContext;
    uint64_t *LocalPlayers;
};

#endif