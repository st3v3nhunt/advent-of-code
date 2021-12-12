#!/usr/bin/env bash

# Lint
find . -name main.ts -exec deno lint {} +

# Run scripts
find . -name main.ts -exec deno run --allow-read {} \;
