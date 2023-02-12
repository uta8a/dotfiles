import { defineTask, link } from "./deps.ts";
import { changeShell, installRust } from "./action/mod.ts";

const home = Deno.env.get("HOME");

if (!home) throw new Error("$HOME is not set");

const deploy = defineTask([
  link({ source: "source/bashrc", destination: `${home}/.bashrc` }),
  link({ source: "source/zshrc", destination: `${home}/.zshrc` }),
  link({ source: "source/gitconfig", destination: `${home}/.gitconfig` }),
  link({ source: "source/starship.toml", destination: `${home}/.config/starship.toml` }),
  link({ source: "source/gpg/gpg-agent.conf", destination: `${home}/.gnupg/gpg-agent.conf` }),
  link({ source: "source/sheldon.toml", destination: `${home}/.sheldon/plugins.toml` }),
  link({ source: "source/tmux.conf", destination: `${home}/.tmux.conf` }),
  changeShell({ destination: "zsh" }),
  installRust(),
]);

if (Deno.args.includes("deploy")) {
  await deploy.run();
} else if (Deno.args.includes("check")) {
  await deploy.stat();
} else {
  console.log(`unknown commands: ${Deno.args}`);
  Deno.exit(1);
}
