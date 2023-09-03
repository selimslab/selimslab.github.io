---
title: A hash table in C from scratch
tags: projects 
layout: code

---

a hash map implementation in C, inspired by <https://github.com/jamesroutley/write-a-hash-table>

```c
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <math.h>

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

static key_value_pair* create_new_key_value_pair(const char* k, const char* v) {
    key_value_pair* pair = malloc(sizeof(pair));
    pair->key = strdup(k);
    pair->value = strdup(v);
    return pair;
}

hash_map* create_new_hash_map() {
    hash_map* hm = malloc(sizeof(hash_map));
    hm->size = 42;
    hm->count = 0;
    hm->pairs = calloc((size_t)hm->size, sizeof(key_value_pair*));
    return hm;
}


static void delete_pair(key_value_pair* p) {
    free(p->key);
    free(p->value);
    free(p);
}


static int create_hash(const char* s, const int a, const int m) {
    long hash = 0;
    const int len_s = strlen(s);
    for (int i = 0; i < len_s; i++) {
        hash += (long)pow(a, len_s - (i+1)) * s[i];
        hash = hash % m;
    }
    return (int)hash;
}


static int get_hash(
    const char* s, const int num_buckets, const int attempt
) {
    const int hash_a = create_hash(s, PRIME_1, num_buckets);
    const int hash_b = create_hash(s, PRIME_2, num_buckets);
    return (hash_a + (attempt * (hash_b + 1))) % num_buckets;
}


void set(hash_map* hm, const char* key, const char* value) {
    key_value_pair* new_pair = create_new_key_value_pair(key, value);
    int index = get_hash(new_pair->key, hm->size, 0);
    key_value_pair* cur_item = hm->pairs[index];
    int i = 1;
    while (cur_item != NULL) {
        if (cur_item != &DELETED_PAIR) {
            // update value, overwrite if key found 
            if (strcmp(cur_item->key, key) == 0) {
                delete_pair(cur_item);
                hm->pairs[index] = new_pair;
                return;
            }
        }
        index = get_hash(new_pair->key, hm->size, i);
        cur_item = hm->pairs[index];
        i++;
    } 
    hm->pairs[index] = new_pair;
    hm->count++;
}



char* get(hash_map* hm, const char* key) {
    int index = get_hash(key, hm->size, 0);
    key_value_pair* pair = hm->pairs[index];
    int i = 1;
    while (pair != NULL) {
        if (pair != &DELETED_PAIR) { 
            if (strcmp(pair->key, key) == 0) {
                return pair->value;
            }
            index = get_hash(key, hm->size, i);
            pair = hm->pairs[index];
            i++;
        } 
    }
    return NULL;
}


void delete(hash_map* hm, const char* key) {
    int index = get_hash(key, hm->size, 0);
    key_value_pair* pair  = hm->pairs[index];
    int i = 1;
    while (pair != NULL) {
        if (pair != &DELETED_PAIR) {
            if (strcmp(pair->key, key) == 0) {
                delete_pair(pair);
                hm->pairs[index] = &DELETED_PAIR;
            }
        }
        index = get_hash(key, hm->size, i);
        pair = hm->pairs[index];
        i++;
    } 
    hm->count--;
}


void delete_all(hash_map* hm) {
    for (int i = 0; i < hm->size; i++) {
        key_value_pair* p = hm->pairs[i];
        if (p != NULL) {
            delete_pair(p);
        }
    }
    free(hm->pairs);
    free(hm);
}

int main() {
    hash_map* hm = create_new_hash_map();
    set(hm, "ans","42");
    assert(get(hm, "ans") == 42);
    remove_key(hm, "ans");
    assert(get(hm, "ans") == NULL);
    delete_all(hm);
}
```