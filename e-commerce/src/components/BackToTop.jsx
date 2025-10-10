import { useEffect, useState } from "react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    if (window.$) {
      $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <a
      className={`btn btn-primary back-to-top ${
        isVisible ? "d-block" : "d-none"
      }`}
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "50px",
        height: "50px",
        borderRadius: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999,
        cursor: "pointer",
      }}
    >
      <i className="fa fa-angle-double-up"></i>
    </a>
  );
};

export default BackToTop;
