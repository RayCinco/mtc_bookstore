export const productsPerPage = 9;

export const categories = [
  {
    id: 1,
    name: "School Uniforms",
    image: "/img/dashboard/uniform_male.jpg",
  },
  {
    id: 2,
    name: "College Textbooks",
    image: "/img/dashboard/textbooks.jpg",
  },
  {
    id: 3,
    name: "School Supplies",
    image: "/img/dashboard/school_supplies.png",
  },
  {
    id: 4,
    name: "Accessories",
    image: "/img/dashboard/accessories.png",
  },
  {
    id: 5,
    name: "Tytana Merchandise",
    image: "/img/dashboard/tytana_merch.png",
  },
];

export const defaultOffers = [
  {
    id: 1,
    discount: "20% off",
    title: "Back to School Sale",
    subtitle: "the all order",
    image: "/img/offer-1.png",
    buttonText: "Shop Now",
    link: "/shop?collection=spring",
    textAlign: "text-md-right",
    bgColor: "bg-secondary",
  },
  {
    id: 2,
    discount: "10% off",
    title: "Campus Essentials",
    subtitle: "the all order",
    image: "/img/offer-2.png",
    buttonText: "Shop Now",
    link: "/shop?collection=winter",
    textAlign: "text-md-left",
    bgColor: "bg-secondary",
  },
];

export const vendorLogos = [
  { id: 1, name: "Tytana Logo", logo: "/img/tytana_logo.png" },
  { id: 2, name: "IT Logo", logo: "/img/it_logo.PNG" },
];

export const socialLinks = [
  { icon: "fab fa-facebook-f", url: "#", name: "Facebook" },
  { icon: "fab fa-twitter", url: "#", name: "Twitter" },
  { icon: "fab fa-linkedin-in", url: "#", name: "LinkedIn" },
  { icon: "fab fa-pinterest", url: "#", name: "Pinterest" },
];

export const navItems = [
  { key: "uniforms", label: "Uniforms" },
  { key: "textbooks", label: "College Textbooks" },
  { key: "accessories", label: "Accessories" },
  { key: "stationery", label: "School Supplies" },
  { key: "merchandise", label: "Tytana Merchandise" },
];
