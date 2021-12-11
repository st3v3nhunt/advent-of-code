#!/usr/bin/env bash

cd 2021/ts || exit

# Lint
find . -name main.ts -exec deno lint {} \;

# Run scripts
find . -name main.ts -exec deno run --allow-read {} \;
