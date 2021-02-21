#!/bin/bash

set -e

CODEFILE=$1
echo $CODEFILE

echo "var code=\`$(cat code.js)\`" > tmp.js
echo "$(cat index.js)" >> tmp.js

npm run build

node app.js
