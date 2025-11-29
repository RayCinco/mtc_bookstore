export function formatPrice(price) {
  const num = Number(price) || 0;
  return `₱${num.toFixed(2)}`;
}

// Get minimum date (tomorrow)
export function getMinDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toISOString().split("T")[0];
}

// Get maximum date (30 days from now)
export function getMaxDate() {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  return maxDate.toISOString().split("T")[0];
}

// Get star rating data (to be used with a React component)
export function getStarRating(rating) {
  return [...Array(5)].map((_, index) => {
    const starIndex = index + 1;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;

    let type = "empty";

    if (starIndex <= fullStars) {
      type = "full";
    } else if (starIndex === fullStars + 1 && hasHalfStar) {
      type = "half";
    }

    return { type, index };
  });
}

// Parse sizes and return array of size labels
export function getSizeLabels(sizes) {
  if (!sizes) return [];
  if (typeof sizes === "string") {
    try {
      const parsed = JSON.parse(sizes);
      return Object.keys(parsed);
    } catch {
      return [];
    }
  }
  if (typeof sizes === "object") {
    return Object.keys(sizes);
  }
  return [];
}

// Get stock for a specific size
export function getSizeStock(sizes, size) {
  if (!sizes || !size) return 0;
  try {
    const parsed = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    return parseInt(parsed[size]) || 0;
  } catch {
    return 0;
  }
}

// Get total stock from sizes object
export function getTotalStock(sizes) {
  if (!sizes) return 0;
  try {
    const parsed = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    return Object.values(parsed).reduce(
      (sum, qty) => sum + (parseInt(qty) || 0),
      0
    );
  } catch {
    return 0;
  }
}

// Check if category uses sizes
export function hasSizes(category) {
  const sizedCategories = [
    "School Uniform",
    "School Uniforms",
    "Tytana Merchandise",
  ];
  return sizedCategories.includes(category);
}

// Get maximum quantity for a product
export function getMaxQuantity(product, selectedSize = null) {
  if (!product) return 0;

  // For sized products
  if (hasSizes(product.category)) {
    if (!selectedSize) return 0;
    return getSizeStock(product.sizes, selectedSize);
  }

  // For non-sized products
  return parseInt(product.quantity) || 0;
}

// Get stock status text
export function getStockStatus(product, selectedSize = null) {
  const maxQty = getMaxQuantity(product, selectedSize);

  if (maxQty === 0) {
    return "Out of Stock";
  }

  if (hasSizes(product.category)) {
    return `${maxQty} available`;
  }

  return `Stocks: ${maxQty} items`;
}
