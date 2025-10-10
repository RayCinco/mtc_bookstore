import HomeCarousel from "../../components/HomeCarousel";
import Categories from "./homeComponents/Categories";
import FeaturedProducts from "./homeComponents/FeaturedProducts";
import Features from "./homeComponents/Features";
import Offer from "./homeComponents/Offer";
import Vendors from "./homeComponents/Vendors";

function HomeMenu() {
  return (
    <>
      <div>
        <HomeCarousel />
      </div>
      <div>
        <Features />
        <Categories />
        <Offer />
        <FeaturedProducts />
        <Vendors />
      </div>
    </>
  );
}

export default HomeMenu;
