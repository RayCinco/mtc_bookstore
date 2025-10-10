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
    <div className="container-fluid bg-secondary mb-5">
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "300px" }}
      >
        <h1 className="font-weight-semi-bold text-uppercase mb-3">{title}</h1>

        {showBreadcrumb && (
          <div className="d-inline-flex">
            {breadcrumbItems.map((item, index) => (
              <div key={index} className="d-inline-flex align-items-center">
                {item.isLast ? (
                  <p className="m-0 text-muted">{item.name}</p>
                ) : (
                  <p className="m-0">
                    <Link
                      to={item.path}
                      className="text-dark text-decoration-none"
                    >
                      {item.name}
                    </Link>
                  </p>
                )}
                {index < breadcrumbItems.length - 1 && (
                  <p className="m-0 px-2">-</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
