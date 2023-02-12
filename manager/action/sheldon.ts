import type { Action } from "../deps.ts";

export const installSheldon = (): Action => ({
  run: async () => {
    const p = Deno.run({
      cmd: ["bash"],
      stdout: "piped",
      stdin: "piped"
    });

    const install = "curl --proto '=https' -fLsS https://rossmacarthur.github.io/install/crate.sh | bash -s -- --repo rossmacarthur/sheldon --to ~/.local/bin";
    await p.stdin.write(new TextEncoder().encode(install));

    await p.stdin.close();
    const output = await p.output()
    if (!(await p.status()).success) {
      throw new Error(new TextDecoder().decode(output));
    }
    p.close();
  },
  stat: async () => {
    const checker = new Deno.Command("sheldon", { args: ["--version"] });
    let output: Deno.CommandOutput;
    try {
      output = await checker.output();
    } catch (e) {
      return { name: 'sheldon', ok: false, message: e.message };
    }
    if (!output.success) {
      return { name: 'sheldon', ok: false, message: new TextDecoder().decode(output.stderr) }
    }
    return { name: 'sheldon', ok: true };
  }
});
