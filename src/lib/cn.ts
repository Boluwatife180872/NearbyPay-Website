/** Tiny clsx-style joiner — keeps components readable without a dependency. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
