import type { Action, Stat } from "../deps.ts";

// sudo chsh -s /bin/SHELL_NAME

const reverseRecord = <
  T extends PropertyKey,
  U extends PropertyKey,
>(input: Record<T, U>) => {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      value,
      key,
    ]),
  ) as Record<U, T>
}

const shells: Record<string, string> = {
  sh: "/bin/sh",
  bash: "/bin/bash",
  zsh: "/bin/zsh",
}

class ShellPromise implements PromiseLike<Stat> {
  readonly #promise: Promise<Stat>;

  constructor(stat: Stat) {
    this.#promise = Promise.resolve(stat);
  }

  then<Result1 = Stat, Result2 = never>(
    onFulfilled?:
      | ((value: Stat) => Result1 | PromiseLike<Result1>)
      | undefined
      | null,
    onRejected?:
      | ((reason: unknown) => Result2 | PromiseLike<Result2>)
      | undefined
      | null
  ): Promise<Result1 | Result2> {
    return this.#promise.then(onFulfilled, onRejected);
  }
}

export const changeShell = ({ destination }: { destination: string; }): Action => ({
  run: async () => {
    const chsh = new Deno.Command("sudo", { args: ["chsh", "-s", shells[destination]] });
    const output = await chsh.output();
    if (!output.success) {
      throw new Error(new TextDecoder().decode(output.stderr));
    }
  },
  stat: async () => {
    const target = Deno.env.get("SHELL");

    if (!target) {
      return { name: destination, ok: false, message: '$SHELL is not set.' };
    }
    const checkShells = reverseRecord(shells);
    if (checkShells[target] !== destination) {
      return { name: destination, ok: false, message: `$SHELL=${checkShells[target]} is not ${destination}.` };
    }
    // return PromiseLike to avoid warning
    const promise = new ShellPromise({ name: destination, ok: true });
    return await promise;
  }
});
