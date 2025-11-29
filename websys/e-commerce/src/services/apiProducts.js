import { apiGet } from "./laravelApis";

export async function getProducts() {
  // Fetch all products from Laravel API
  return await apiGet("/products");
}

export async function getProduct(id) {
  // Fetch a single product by ID from Laravel API
  return await apiGet(`/products/${id}`);
}

// const data = [
//   // === UNIFORMS ===
//   // Nursing Shirts
//   {
//     id: 1,
//     name: "Nursing Shirt Men",
//     price: 350.0,
//     image: "/img/uniforms/uniform_nursing_men.png",
//     rating: 4.8,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description:
//       "Professional fit, breathable fabric, comfortable for long shifts.",
//   },
//   {
//     id: 2,
//     name: "Nursing Shirt Women",
//     price: 350.0,
//     image: "/img/uniforms/uniform_nursing_women.png",
//     rating: 4.8,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description:
//       "Tailored fit, breathable fabric, designed for comfort and professionalism.",
//   },
//   // Accountancy Shirts
//   {
//     id: 3,
//     name: "Accountancy Shirt Men",
//     price: 320.0,
//     image: "/img/uniforms/uniform_accountancy_men.png",
//     rating: 4.6,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Professional business attire, classic fit.",
//   },
//   {
//     id: 4,
//     name: "Accountancy Shirt Women",
//     price: 320.0,
//     image: "/img/uniforms/uniform_accountancy_women.png",
//     rating: 4.6,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Elegant professional design, tailored fit.",
//   },
//   // Senior High School Shirt
//   {
//     id: 5,
//     name: "Senior High School Shirt",
//     price: 280.0,
//     image: "/img/uniforms/uniform_shs_men.png",
//     rating: 4.7,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Comfortable daily wear, durable fabric.",
//   },
//   // Psychology Shirt
//   {
//     id: 6,
//     name: "Psychology Shirt Women",
//     price: 310.0,
//     image: "/img/uniforms/uniform_psychology_women.png",
//     rating: 4.5,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Tailored fit with department branding.",
//   },
//   // Hospitality Management Shirt
//   {
//     id: 7,
//     name: "Hospitality Management Shirt Men",
//     price: 330.0,
//     image: "/img/uniforms/uniform_hospitality_men.png",
//     rating: 4.7,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Professional service attire.",
//   },
//   // Communication Shirt
//   {
//     id: 8,
//     name: "Communication Shirt Men",
//     price: 310.0,
//     image: "/img/uniforms/uniform_communication_men.png",
//     rating: 4.6,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Modern fit, quality fabric.",
//   },
//   // Nursing Pants
//   {
//     id: 9,
//     name: "Nursing Pants",
//     price: 280.0,
//     image: "/img/uniforms/uniform_nursing_pants.png",
//     rating: 4.8,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Comfortable fit with multiple pockets.",
//   },
//   // PE Uniforms
//   {
//     id: 10,
//     name: "PE Uniform (SHS)",
//     price: 250.0,
//     image: "/img/uniforms/uniform_shs_pe.png",
//     rating: 4.5,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Breathable athletic wear for active students.",
//   },
//   {
//     id: 11,
//     name: "PE Uniform (College)",
//     price: 260.0,
//     originalPrice: 300.0,
//     image: "/img/uniforms/uniform_college_pe.png",
//     rating: 4.6,
//     sizes: ["XS", "S", "M", "L", "XL", "XXL"],
//     category: "Uniform",
//     description: "Durable and comfortable for all physical activities.",
//   },

//   // === TEXTBOOKS ===
//   {
//     id: 12,
//     name: "Basic Physics Textbook",
//     price: 650.0,
//     originalPrice: 750.0,
//     image: "/img/textbooks/textbook_physics.jpg",
//     rating: 4.9,
//     category: "Textbook",
//     description:
//       "Comprehensive physics textbook covering fundamental concepts and applications.",
//   },
//   {
//     id: 13,
//     name: "Anatomy & Physiology",
//     price: 720.0,
//     originalPrice: 850.0,
//     image: "/img/textbooks/textbooks_anatomy.jpg",
//     rating: 4.8,
//     category: "Textbook",
//     description:
//       "Essential anatomy and physiology guide for nursing and health science students.",
//   },
//   {
//     id: 14,
//     name: "Introduction to Computing",
//     price: 580.0,
//     originalPrice: 680.0,
//     image: "/img/textbooks/textbook_ITC.jpg",
//     rating: 4.7,
//     category: "Textbook",
//     description:
//       "Foundational textbook for computer science and IT fundamentals.",
//   },
//   {
//     id: 15,
//     name: "Management Principles",
//     price: 620.0,
//     originalPrice: 720.0,
//     image: "/img/textbooks/textbook_management.jpg",
//     rating: 4.6,
//     category: "Textbook",
//     description:
//       "Core management concepts and business administration principles.",
//   },

//   // === STATIONERY ===
//   {
//     id: 16,
//     name: "Tytana Notebook",
//     price: 85.0,
//     originalPrice: 100.0,
//     image: "/img/stationary/stationary_notebook.png",
//     rating: 4.7,
//     category: "Stationery",
//     description:
//       "Premium quality notebook with lined pages and Tytana branding.",
//   },
//   {
//     id: 17,
//     name: "Tytana Ballpen",
//     price: 35.0,
//     originalPrice: 45.0,
//     image: "/img/stationary/stationary_ballpen.png",
//     rating: 4.5,
//     category: "Stationery",
//     description: "Smooth-writing ballpen with comfortable grip.",
//   },
//   {
//     id: 18,
//     name: "Tytana Folder",
//     price: 65.0,
//     originalPrice: 80.0,
//     image: "/img/stationary/stationary_folder.png",
//     rating: 4.6,
//     category: "Stationery",
//     description: "Durable folder with multiple compartments for organization.",
//   },
//   {
//     id: 19,
//     name: "Tytana Pad Paper",
//     price: 55.0,
//     originalPrice: 70.0,
//     image: "/img/stationary/stationary_paper.png",
//     rating: 4.5,
//     category: "Stationery",
//     description: "High-quality pad paper with perforated edges.",
//   },
//   {
//     id: 20,
//     name: "Tytana Pencil",
//     price: 25.0,
//     originalPrice: 35.0,
//     image: "/img/stationary/stationary_pencil.png",
//     rating: 4.4,
//     category: "Stationery",
//     description: "Quality pencils perfect for writing and sketching.",
//   },
//   {
//     id: 21,
//     name: "Tytana Envelope",
//     price: 40.0,
//     originalPrice: 50.0,
//     image: "/img/stationary/stationary_envelope.png",
//     rating: 4.3,
//     category: "Stationery",
//     description: "Professional envelopes with Tytana branding.",
//   },

//   // === ACCESSORIES ===
//   {
//     id: 22,
//     name: "Tytana Lanyard",
//     price: 75.0,
//     originalPrice: 95.0,
//     image: "/img/accessories/accessories_lanyard.png",
//     rating: 4.8,
//     category: "Accessories",
//     description: "Durable lanyard with Tytana logo and secure clip.",
//   },
//   {
//     id: 23,
//     name: "Tytana Pin",
//     price: 45.0,
//     originalPrice: 60.0,
//     image: "/img/accessories/accessories_pin.png",
//     rating: 4.6,
//     category: "Accessories",
//     description: "Collectible pin with official Tytana design.",
//   },

//   // === MERCHANDISE ===
//   {
//     id: 24,
//     name: "Tytana Tote Bag",
//     price: 380.0,
//     originalPrice: 450.0,
//     image: "/img/merchandise/merchandise_totebag.png",
//     rating: 4.9,
//     category: "Merchandise",
//     description:
//       "Spacious and durable tote bag with Tytana branding, perfect for books and supplies.",
//   },
// ];

// export function getProducts() {
//   return data;
// }

// export function getProduct(id) {
//   return data.find((item) => item.id === id);
// }
