import { defineTask } from "dotstingray/core/mod.ts";
import { link } from "dotstingray/utils/mod.ts";

const home = Deno.env.get("HOME");

if (!home) throw new Error("$HOME is not set");

const deploy = defineTask([
  link({ source: "source/gitconfig", destination: `${home}/.gitconfig` }),
]);

if (Deno.args.includes("deploy")) {
  await deploy.run();
} else if (Deno.args.includes("check")) {
  await deploy.stat();
} else {
  console.log(`unknown commands: ${Deno.args}`);
  Deno.exit(1);
}