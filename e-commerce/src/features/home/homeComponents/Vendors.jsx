import VendorCarousel from "../../../components/VendorCarousel";

const sampleVendors = [
  { id: 1, name: "Vendor 1", logo: "/img/vendor-1.jpg" },
  { id: 2, name: "Vendor 2", logo: "/img/vendor-2.jpg" },
  { id: 3, name: "Vendor 3", logo: "/img/vendor-3.jpg" },
  { id: 4, name: "Vendor 4", logo: "/img/vendor-4.jpg" },
  { id: 5, name: "Vendor 5", logo: "/img/vendor-5.jpg" },
  { id: 6, name: "Vendor 6", logo: "/img/vendor-6.jpg" },
];

function Vendors() {
  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col">
          <VendorCarousel vendors={sampleVendors} className="vendor-carousel" />
        </div>
      </div>
    </div>
  );
}

export default Vendors;
