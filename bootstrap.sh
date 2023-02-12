#!/bin/bash
set -ue

curl -fsSL https://deno.land/x/install/install.sh | sh

export DENO_INSTALL="$HOME/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"

# mkdir -p $DIR
# git clone dotfiles
# deno task rm
# deno task deploy
# source ~/.zshrc
# deno task check