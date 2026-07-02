# dotfiles

OS ごとにディレクトリを分けています。

- `archlinux/`: 既存の Arch Linux 向け設定と bootstrap
- `macos/`: macOS 向け設定の作業用ディレクトリ
- `nix/`: OS をまたいで使う Nix / Home Manager 設定

Arch Linux の bootstrap:

```sh
./archlinux/bootstrap/arch.sh
```

macOS の bootstrap:

```sh
./macos/bootstrap/macos.sh
```

macOS で Home Manager を直接使う場合:

```sh
home-manager switch -I nixpkgs=channel:nixpkgs -f ./macos/home.nix
```

Ghostty 設定は Home Manager から配布する。

```nix
{
  imports = [
    ./nix/home-manager/ghostty.nix
  ];
}
```
