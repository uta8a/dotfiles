import type { Action } from "../deps.ts";

export const installPoetry = (): Action => ({
  run: async () => {
    const p = Deno.run({
      cmd: ["bash"],
      stdout: "piped",
      stdin: "piped"
    });

    const install = "curl -sSL https://install.python-poetry.org | python3 -";
    await p.stdin.write(new TextEncoder().encode(install));

    await p.stdin.close();
    const output = await p.output()
    if (!(await p.status()).success) {
      throw new Error(new TextDecoder().decode(output));
    }
    p.close();
  },
  stat: async () => {
    const checker = new Deno.Command("poetry", { args: ["--version"] });
    let output: Deno.CommandOutput;
    try {
      output = await checker.output();
    } catch (e) {
      return { name: 'poetry', ok: false, message: e.message };
    }
    if (!output.success) {
      return { name: 'poetry', ok: false, message: new TextDecoder().decode(output.stderr) }
    }
    return { name: 'poetry', ok: true };
  }
});
