import { apiGet, apiPost, apiDelete } from "./laravelApis";
import { getCurrentUser } from "./apiAuth";
// Get cart items for a user (pass userId or null for all)
export async function getCart() {
  const user = await getCurrentUser();
  const userId = user.id;
  if (userId) {
    return await apiGet(`/cart_items/${userId}`);
  }
  return await apiGet("/cart_items");
}

// Delete a cart item by its ID
export async function deleteCartItem(cartItemId) {
  return await apiDelete(`/delete_cart_item/${cartItemId}`);
}

// Update a cart item by its ID
export async function createUpdateCartItem(cartItem) {
  if (cartItem.id) {
    return await apiPost(`/create_update_cart_item/${cartItem.id}`, cartItem);
  } else {
    const cart = await getCart();
    const cart_id = cart.cart_id;

    const payload = { cart_id, ...cartItem };
    return await apiPost(`/create_update_cart_item`, payload);
  }
}

// export function getCart() {
//   // Sample cart data aligned with the product data structure in apiProducts.js
//   // Images use the same paths as products. For gendered uniforms the image is an array [men, women].
//   const data = [
//     {
//       id: 1,
//       productId: 1,
//       name: "Nursing Shirt",
//       price: 350.0,
//       quantity: 1,
//       image: "/img/uniforms/uniform_nursing_men.png",
//       selectedSize: "M",
//       category: "Uniform",
//     },
//     {
//       id: 2,
//       productId: 2,
//       name: "Accountancy Shirt",
//       price: 320.0,
//       quantity: 1,
//       image: "/img/uniforms/uniform_accountancy_men.png",
//       selectedSize: "S",
//       category: "Uniform",
//     },
//     {
//       id: 3,
//       productId: 7,
//       name: "Nursing Women",
//       price: 280.0,
//       quantity: 2,
//       image: "/img/uniforms/uniform_nursing_women.png",
//       selectedSize: "L",
//       category: "Uniform",
//     },
//     {
//       id: 4,
//       productId: 10,
//       name: "Basic Physics Textbook",
//       price: 650.0,
//       quantity: 1,
//       image: "/img/textbooks/textbook_physics.jpg",
//       selectedSize: null,
//       category: "Textbook",
//     },
//     {
//       id: 5,
//       productId: 22,
//       name: "Tytana Tote Bag",
//       price: 380.0,
//       quantity: 1,
//       image: "/img/merchandise/merchandise_totebag.png",
//       selectedSize: null,
//       category: "Merchandise",
//     },
//   ];

//   return data;
// }
