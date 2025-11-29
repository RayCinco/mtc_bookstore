import { Link, useLocation } from "react-router-dom";

function Header({ title = "Our Shop", showBreadcrumb = true }) {
  const location = useLocation();

  // Generate breadcrumb based on current path
  const generateBreadcrumb = () => {
    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    const breadcrumbItems = [{ name: "Home", path: "/" }];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const segmentName = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbItems.push({
        name: segmentName,
        path: currentPath,
        isLast: index === pathSegments.length - 1,
      });
    });

    return breadcrumbItems;
  };

  const breadcrumbItems = generateBreadcrumb();

  return (
    <div
      className="container-fluid mb-5"
      style={{
        backgroundImage: `url('/img/college-textbooks.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.45)", width: "100%" }}>
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "300px", padding: "40px 0" }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3 text-white">
            {title}
          </h1>

          {showBreadcrumb && (
            <div className="d-inline-flex">
              {breadcrumbItems.map((item, index) => (
                <div key={index} className="d-inline-flex align-items-center">
                  {item.isLast ? (
                    <p className="m-0 text-white">{item.name}</p>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-white text-decoration-none"
                    >
                      <p className="m-0">{item.name}</p>
                    </Link>
                  )}
                  {index < breadcrumbItems.length - 1 && (
                    <p className="m-0 px-2 text-white">-</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
