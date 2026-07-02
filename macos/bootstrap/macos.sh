#!/usr/bin/env bash
set -euxo pipefail

repo_root=$(cd "$(dirname "$0")/.." && pwd)
home_manager_release="26.05"
nixpkgs_channel="https://channels.nixos.org/nixpkgs-${home_manager_release}-darwin"
home_manager_channel="https://github.com/nix-community/home-manager/archive/release-${home_manager_release}.tar.gz"

if ! command -v nix >/dev/null 2>&1; then
  sh <(curl -L https://nixos.org/nix/install)
  . /nix/var/nix/profiles/default/etc/profile.d/nix-daemon.sh
fi

nix-channel --add "$nixpkgs_channel" nixpkgs
nix-channel --add "$home_manager_channel" home-manager

nix-channel --update

if ! command -v home-manager >/dev/null 2>&1; then
  nix-shell '<home-manager>' -A install
fi

home-manager switch -b backup -I nixpkgs=channel:nixpkgs -f "$repo_root/home.nix"
