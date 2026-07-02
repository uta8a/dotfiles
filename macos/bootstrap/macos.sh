#!/bin/sh
set -euxo pipefail

repo_root=$(cd "$(dirname "$0")/.." && pwd)

if ! command -v nix >/dev/null 2>&1; then
  sh <(curl -L https://nixos.org/nix/install)
  . /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
fi

if ! command -v home-manager >/dev/null 2>&1; then
  nix-channel --add \
    https://github.com/nix-community/home-manager/archive/release-25.05.tar.gz \
    home-manager
  nix-channel --update
  nix-shell '<home-manager>' -A install
fi

home-manager switch -f "$repo_root/home.nix"
