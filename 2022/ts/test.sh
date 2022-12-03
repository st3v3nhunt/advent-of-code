#!/usr/bin/env bash

find . -name main.ts -exec deno run --allow-read {} \;
