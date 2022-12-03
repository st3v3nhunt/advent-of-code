#!/usr/bin/env bash

find . -name "*.ts" -exec deno lint {} +
