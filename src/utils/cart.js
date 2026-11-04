export function buildCartFromLines(lines) {
  const products = lines.map((line) => {
    const total = line.price * line.quantity;
    const discountedTotal = total * (1 - (line.discountPercentage || 0) / 100);
    return { ...line, total, discountedTotal };
  });

  return {
    products,
    total: products.reduce((sum, p) => sum + p.total, 0),
    discountedTotal: products.reduce((sum, p) => sum + p.discountedTotal, 0),
    totalProducts: products.length,
    totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
  };
}
