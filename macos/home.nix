{ config, pkgs, ... }:

{
  imports = [
    ../nix/home-manager/ghostty.nix
  ];

  home.username = builtins.getEnv "USER";
  home.homeDirectory = builtins.getEnv "HOME";

  programs.home-manager.enable = true;

  home.stateVersion = "24.11";
}
