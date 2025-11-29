import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import OrderTable from "./OrderTable";

function OrderMenu() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <OrderTable />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default OrderMenu;
