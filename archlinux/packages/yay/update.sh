#!/bin/bash

set -eux -o pipefail

# same with install.sh
script_dir=$(cd "$(dirname "$0")" && pwd)
bash -c "$script_dir/install.sh"
