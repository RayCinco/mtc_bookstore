// Parse sizes JSON string to display format
export function parseSizesDisplay(sizes) {
  let sizesDisplay = "";
  try {
    const sizesObj = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    sizesDisplay = Object.entries(sizesObj)
      .map(([size, qty]) => `${size}: ${qty}`)
      .join(", ");
  } catch {
    sizesDisplay = String(sizes);
  }
  return sizesDisplay;
}

// Calculate total quantity from sizes JSON string/object
export function getTotalQuantityFromSizes(sizes) {
  try {
    const sizesObj = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    return Object.values(sizesObj).reduce((sum, qty) => sum + Number(qty), 0);
  } catch {
    return 0;
  }
}
