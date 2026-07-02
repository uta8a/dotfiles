# macOS dotfiles

macOS 向けの設定はこのディレクトリ以下に追加していく。

Home Manager のエントリポイント:

```sh
home-manager switch -I nixpkgs=channel:nixpkgs -f ./macos/home.nix
```

bootstrap は `nix` が未インストールなら先に Nix を入れ、`nixpkgs` と `home-manager` のリリースを揃えてから適用する。
