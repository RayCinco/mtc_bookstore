import VendorCarousel from "../../../components/VendorCarousel";
import { vendorLogos } from "../../../utils/constants";

function Vendors() {
  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col">
          <VendorCarousel vendors={vendorLogos} className="vendor-carousel" />
        </div>
      </div>
    </div>
  );
}

export default Vendors;
