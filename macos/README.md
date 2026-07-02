# macOS dotfiles

macOS 向けの設定はこのディレクトリ以下に追加していく。

Home Manager のエントリポイント:

```sh
home-manager switch -f ./macos/home.nix
```

bootstrap は `nix` が未インストールなら先に Nix を入れ、`home-manager` が未インストールなら Home Manager を install してから適用する。
