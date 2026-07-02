#!/bin/sh
set -euxo pipefail

repo_root=$(cd "$(dirname "$0")/.." && pwd)
home-manager switch -f "$repo_root/home.nix"
