#!/usr/bin/env bash

cd 2021/ts
find . -name main.ts -exec deno run --allow-read {} \;
