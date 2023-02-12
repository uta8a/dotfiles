import type { Action } from "../deps.ts";

export const installGo = (): Action => ({
  run: async () => {
    const p = Deno.run({
      cmd: ["bash"],
      stdout: "piped",
      stdin: "piped"
    });

    const install = "wget https://go.dev/dl/go1.20.linux-amd64.tar.gz -O - | sudo tar xzf - -C /usr/local/bin";
    await p.stdin.write(new TextEncoder().encode(install));

    await p.stdin.close();
    const output = await p.output()
    if (!(await p.status()).success) {
      throw new Error(new TextDecoder().decode(output));
    }
    p.close();
  },
  stat: async () => {
    const checker = new Deno.Command("go", { args: ["version"] });
    let output: Deno.CommandOutput;
    try {
      output = await checker.output();
    } catch (e) {
      return { name: 'go', ok: false, message: e.message };
    }
    if (!output.success) {
      return { name: 'go', ok: false, message: new TextDecoder().decode(output.stderr) }
    }
    return { name: 'go', ok: true };
  }
});
