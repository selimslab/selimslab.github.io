typedef struct {
    char* key;
    char* value;
} key_value_pair;

typedef struct {
    int size;
    int count;
    key_value_pair** pairs;
} hash_map;

static key_value_pair DELETED_PAIR = {NULL, NULL};

const int PRIME_1 = 151;
const int PRIME_2 = 163;

void set(hash_map* ht, const char* key, const char* value);
char* get(hash_map* ht, const char* key);
void delete(hash_map* ht, const char* key);