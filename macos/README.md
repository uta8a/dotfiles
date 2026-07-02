# macOS dotfiles

macOS 向けの設定はこのディレクトリ以下に追加していく。

Home Manager のエントリポイント:

```sh
home-manager switch -f ./macos/home.nix
```

bootstrap は `home-manager` が未インストールなら、Home Manager の channel を追加して install してから適用する。
