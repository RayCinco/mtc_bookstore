import Header from "../../components/Header";
{
  /*import ProductDetails from "./productComponents/ProductDetails";*/
}
import ShopDetails from "./productComponents/ShopDetails";
function ProductMenu() {
  return (
    <>
      <Header title="Product Details" showBreadcrumb={true} />
      <ShopDetails />
    </>
  );
}

export default ProductMenu;
