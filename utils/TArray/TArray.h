#ifndef TARRAY_H
#define TARRAY_H

#include <stdint.h>

template <typename ElementType>
class TArray
{
public:
    ElementType *Allocator;
    int32_t ArrayNum;
    int32_t ArrayMax;
};

#endif