export function formatFloat(n: number): string {
  return n.toString().includes('.') ? n.toString() : n.toFixed(1);
}