import type { Action } from "../deps.ts";

export const installRust = (): Action => ({
  run: async () => {
    const p = Deno.run({
      cmd: ["bash"],
      stdout: "piped",
      stdin: "piped"
    });

    const install = "curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y";
    await p.stdin.write(new TextEncoder().encode(install));

    await p.stdin.close();
    const output = await p.output()
    if (!(await p.status()).success) {
      throw new Error(new TextDecoder().decode(output));
    }
    p.close();
  },
  stat: async () => {
    const checker = new Deno.Command("rustup", { args: ["--version"] });
    let output: Deno.CommandOutput;
    try {
      output = await checker.output();
    } catch (e) {
      return { name: 'rust', ok: false, message: e.message };
    }
    if (!output.success) {
      return { name: 'rust', ok: false, message: new TextDecoder().decode(output.stderr) }
    }
    return { name: 'rust', ok: true };
  }
});
