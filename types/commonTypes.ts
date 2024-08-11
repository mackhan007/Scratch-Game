type tNullable<T> = T | null;

interface iBoxSizing {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type { iBoxSizing, tNullable };
