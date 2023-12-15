#!/bin/bash

set -eux -o pipefail

# same with install.sh
# $PWD is project git root
bash -c $PWD/packages/yay/install.sh
