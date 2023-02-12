import * as rm from './remove/mod.ts'

const home = Deno.env.get("HOME");

if (!home) throw new Error("$HOME is not set");

await rm.link({ destination: `${home}/.bashrc` });
await rm.link({ destination: `${home}/.zshrc` });
await rm.link({ destination: `${home}/.gitconfig` });
await rm.link({ destination: `${home}/.config/starship.toml` });
await rm.link({ destination: `${home}/.gnupg/gpg-agent.conf` });
await rm.link({ destination: `${home}/.config/sheldon/plugins.toml` });
await rm.link({ destination: `${home}/.tmux.conf` });
