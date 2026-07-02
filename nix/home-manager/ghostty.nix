{ config, lib, ... }:

let
  ghosttyConfig = ../ghostty/config;
in
{
  xdg.configFile."ghostty/config" = {
    source = ghosttyConfig;
  };
}
