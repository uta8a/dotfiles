# dotfiles

my dotfiles

# 手順

Install [deno](https://deno.land/)

```console
curl -fsSL https://deno.land/x/install/install.sh | sh
```

`~/.bashrc`, `~/.zshrc` に以下を書き込む(後で `~/.zshrc` は上書きされる)

```bash
export DENO_INSTALL="$HOME/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"
```

Execute

```console
# TODO: shell script bootstrap
```

# dev

```console
deno task deploy # deploy dotfiles
deno task check  # check stat
deno task rm     # rm symlinks or files
```

# directory

```text
.devcontainer/ # for develop
.vscode/       # for develop
deps/          # temporary, switch to upstream in the future
manager/       # manager of dotfiles, powered by AumyF/dotstingray
source/        # dotfiles
```
