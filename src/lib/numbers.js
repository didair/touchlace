// https://www.trysmudford.com/blog/linear-interpolation-functions/
export const lerp = (x, y, a) => x * (1 - a) + y * a;
export const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
export const invlerp = (x, y, a) => clamp((a - x) / (y - x));
export const range = (x1, y1, x2, y2, a) => lerp(x2, y2, invlerp(x1, y1, a));