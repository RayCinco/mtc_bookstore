import CartContent from "./cartComponents/CartContent";
import Header from "../../components/Header";
function CartMenu() {
  return (
    <>
      <Header title="Your Cart" showBreadcrumb={true} />
      <CartContent />
    </>
  );
}

export default CartMenu;
