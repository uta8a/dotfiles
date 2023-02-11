#!/bin/bash

set -ue

curl -fsSL https://deno.land/x/install/install.sh | sh

echo 'export DENO_INSTALL="$HOME/.deno"' >> ~/.bashrc
echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.bashrc

exec /bin/bash --login
