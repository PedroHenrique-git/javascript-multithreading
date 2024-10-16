#include <stdio.h>
#include <stdbool.h>
#include <inttypes.h>
#include <stdlib.h>
#include <time.h>

uint64_t random64(unsigned int *seed)
{
    uint64_t result;
    uint8_t *result8 = (uint8_t *)&result;

    for (int i = 0; i < 8; i++)
    {
        result8[i] = rand_r(seed);
    }

    return result;
}

uint64_t sum_digits_squared(uint64_t num)
{
    uint64_t total = 0;

    while (num > 0)
    {
        uint64_t num_mod_base = num % 10;
        total += num_mod_base * num_mod_base;

        num = num / 10;
    }

    return total;
}

bool is_happy(uint64_t num)
{
    while (num != 1 && num != 4)
    {
        num = sum_digits_squared(num);
    }

    return num == 1;
}

bool is_happycoin(uint64_t num)
{
    return is_happy(num) && num % 10000 == 0;
}

int main(void)
{
    unsigned int seed = time(NULL);

    int count = 0;

    for (int i = 0; i < 10000000; i++)
    {
        uint64_t radom_num = random64(&seed);

        if (is_happycoin(radom_num))
        {
            printf("%", PRIu64 " ", radom_num);
            count++;
        }

        printf("\ncount %d\n", count);
    }

    return 0;
}