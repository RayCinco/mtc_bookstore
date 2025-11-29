import Header from "../../components/Header";
import ShopProduct from "./shopComponents.jsx/ShopProduct";
function ShopMenu() {
  return (
    <>
      <Header title="Our Shop" showBreadcrumb={true} />
      <ShopProduct />
    </>
  );
}

export default ShopMenu;
