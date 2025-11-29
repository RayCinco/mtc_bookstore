import React from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Spinner,
} from "reactstrap";

import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "../../variables/charts.js";
import DashboardStats from "./DashboardStats.jsx";

import { useDashboardData } from "./useDashboardData.js";

function DashboardMenu() {
  const { isLoadingDashboard, dashboardData } = useDashboardData();

  if (isLoadingDashboard) {
    return (
      <div className="content">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <Spinner color="primary" />
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="content">
        <div className="alert alert-warning">No dashboard data available</div>
      </div>
    );
  }

  const {
    monthly_revenue = [],
    order_status = [],
    top_products = [],
  } = dashboardData;

  return (
    <>
      <div className="content">
        <DashboardStats dashboardData={dashboardData} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Monthly Revenue</CardTitle>
                <p className="card-category">Revenue from completed orders</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboard24HoursPerformanceChart.data(monthly_revenue)}
                  options={dashboard24HoursPerformanceChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated now
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Order Status</CardTitle>
                <p className="card-category">Distribution by status</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                <Pie
                  data={dashboardEmailStatisticsChart.data(order_status)}
                  options={dashboardEmailStatisticsChart.options}
                />
              </CardBody>
              <CardFooter>
                <div className="legend">
                  {order_status.map((status, idx) => (
                    <span key={idx}>
                      <i
                        className={`fa fa-circle text-${
                          ["primary", "warning", "danger", "success", "info"][
                            idx % 5
                          ]
                        }`}
                      />{" "}
                      {status.status} ({status.total}){" "}
                    </span>
                  ))}
                </div>
                <hr />
                <div className="stats">
                  <i className="fa fa-calendar" /> Total orders
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Top Selling Products</CardTitle>
                <p className="card-category">Products by quantity sold</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data(top_products)}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-warning" /> Top selling items
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data from order history
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default DashboardMenu;
