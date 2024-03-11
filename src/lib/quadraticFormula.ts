export function quadraticFormula(a: number, b: number, c: number) {
  const discriminant = b ** 2 - 4 * a * c;
  const numerator_1 = -b + Math.sqrt(discriminant);
  const numerator_2 = -b - Math.sqrt(discriminant);
  const denominator = 2 * a;
  const root_1 = numerator_1 / denominator;
  const root_2 = numerator_2 / denominator;
  return [root_1, root_2];
}
