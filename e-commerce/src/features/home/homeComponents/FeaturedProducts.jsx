import ProductCarousel from "../../../components/ProductCarousel";
// Sample data - replace with your actual data
const sampleProducts = [
  {
    id: 1,
    name: "Colorful Stylish Shirt",
    price: 123.0,
    originalPrice: 123.0,
    image: "/img/product-1.jpg",
  },
  {
    id: 2,
    name: "Colorful Stylish Shirt",
    price: 123.0,
    originalPrice: 123.0,
    image: "/img/product-2.jpg",
  },
  {
    id: 3,
    name: "Colorful Stylish Shirt",
    price: 123.0,
    originalPrice: 123.0,
    image: "/img/product-3.jpg",
  },
  {
    id: 4,
    name: "Colorful Stylish Shirt",
    price: 123.0,
    originalPrice: 123.0,
    image: "/img/product-4.jpg",
  },
];

function FeaturedProducts() {
  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Trandy Products</span>
        </h2>
      </div>
      <div className="row px-xl-5 pb-3">
        <div className="col">
          <ProductCarousel
            products={sampleProducts}
            className="product-carousel"
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
