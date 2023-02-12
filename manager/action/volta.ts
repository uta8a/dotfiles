import type { Action } from "../deps.ts";

export const installVolta = (): Action => ({
  run: async () => {
    const p = Deno.run({
      cmd: ["bash"],
      stdout: "piped",
      stdin: "piped"
    });

    const install = "curl https://get.volta.sh | bash";
    await p.stdin.write(new TextEncoder().encode(install));

    await p.stdin.close();
    const output = await p.output()
    if (!(await p.status()).success) {
      throw new Error(new TextDecoder().decode(output));
    }
    p.close();
  },
  stat: async () => {
    const checker = new Deno.Command("volta", { args: ["--version"] });
    let output: Deno.CommandOutput;
    try {
      output = await checker.output();
    } catch (e) {
      return { name: 'volta', ok: false, message: e.message };
    }
    if (!output.success) {
      return { name: 'volta', ok: false, message: new TextDecoder().decode(output.stderr) }
    }
    return { name: 'volta', ok: true };
  }
});
