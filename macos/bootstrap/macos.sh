#!/bin/sh
set -euxo pipefail

repo_root=$(cd "$(dirname "$0")/.." && pwd)

if ! command -v nix >/dev/null 2>&1; then
  echo "nix command not found" >&2
  exit 1
fi

if ! command -v home-manager >/dev/null 2>&1; then
  nix-channel --add \
    https://github.com/nix-community/home-manager/archive/release-25.05.tar.gz \
    home-manager
  nix-channel --update
  nix-shell '<home-manager>' -A install
fi

home-manager switch -f "$repo_root/home.nix"
