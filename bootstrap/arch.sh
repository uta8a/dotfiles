#!/bin/sh
set -euxo pipefail

pueued &

list=$(cat arch.yaml | yq '.tool[]')
for item in $list
do
  # sver hash check with lockfile, skip or not
  pueue add "bash -c packages/$item/install.sh"
done

pueue parallel $(nproc)

echo 'OK! Type `$ pueue` you see progress'
echo 'DEBUG: `$ pueue reset` -- reset pueue queue'
