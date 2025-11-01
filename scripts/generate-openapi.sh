#!/usr/bin/env bash
set -euo pipefail
OUT_DIR=./generated
mkdir -p $OUT_DIR
openapi-generator-cli generate -i openapi.yaml -g typescript-fetch -o $OUT_DIR/ts-client --skip-validate-spec
