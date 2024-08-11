#include <iostream>
// #include "UObject/UObject.h"

extern "C" int test(int a, int b)
{
    return a + b + 1;
    // printf("hello world\n");
}

int main()
{
    test(1, 2);

    return 0;
}
