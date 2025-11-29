import { Row, Col, Card, CardBody, CardFooter, CardTitle } from "reactstrap";

function DashboardStats({ dashboardData }) {
  if (!dashboardData || !dashboardData.summary) {
    return null;
  }

  const { summary } = dashboardData;

  const statsData = [
    {
      icon: "fas fa-shopping-cart text-primary",
      category: "Total Orders",
      value: summary.total_orders || 0,
      footerIcon: "fas fa-receipt text-primary",
      footerText: "View all orders",
    },
    {
      icon: "fas fa-coins text-success",
      category: "Total Revenue",
      value: `₱${parseFloat(summary.total_revenue || 0).toLocaleString(
        "en-US",
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      )}`,
      footerIcon: "fas fa-chart-line text-success",
      footerText: "Revenue growth",
    },
    {
      icon: "fas fa-boxes text-warning",
      category: "Total Products",
      value: summary.total_products || 0,
      footerIcon: "fas fa-plus-square text-warning",
      footerText: "Add new product",
    },
    {
      icon: "fas fa-exclamation-triangle text-danger",
      category: "Low Stock Alert",
      value: summary.low_stock_count || 0,
      footerIcon: "fas fa-box text-danger",
      footerText: "Products below 5 units",
    },
  ];

  return (
    <Row>
      {statsData.map((stat, idx) => (
        <Col lg="3" md="6" sm="6" key={idx}>
          <Card className="card-stats">
            <CardBody>
              <Row>
                <Col md="4" xs="5">
                  <div className="icon-big text-center icon-warning">
                    <i className={stat.icon} />
                  </div>
                </Col>
                <Col md="8" xs="7">
                  <div className="numbers">
                    <p className="card-category">{stat.category}</p>
                    <CardTitle tag="p">{stat.value}</CardTitle>
                    <p />
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className={stat.footerIcon} /> {stat.footerText}
              </div>
            </CardFooter>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardStats;
