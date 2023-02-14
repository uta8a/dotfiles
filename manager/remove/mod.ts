export const link = async ({ destination }: { destination: string }) => {
  await Deno.remove(destination, { recursive: true });
};
