import type { Action } from "../deps.ts";

export const installStarship = (): Action => ({
  run: async () => {
    const p = Deno.run({
      cmd: ["bash"],
      stdout: "piped",
      stdin: "piped",
    });

    const install = "curl -sS https://starship.rs/install.sh | sh -s -- -y";
    await p.stdin.write(new TextEncoder().encode(install));

    await p.stdin.close();
    const output = await p.output();
    if (!(await p.status()).success) {
      throw new Error(new TextDecoder().decode(output));
    }
    p.close();
  },
  stat: async () => {
    const checker = new Deno.Command("starship", { args: ["--version"] });
    let output: Deno.CommandOutput;
    try {
      output = await checker.output();
    } catch (e) {
      return { name: "starship", ok: false, message: e.message };
    }
    if (!output.success) {
      return {
        name: "starship",
        ok: false,
        message: new TextDecoder().decode(output.stderr),
      };
    }
    return { name: "starship", ok: true };
  },
});
