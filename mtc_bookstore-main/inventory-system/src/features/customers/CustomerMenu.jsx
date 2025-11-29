import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import CustomerTable from "./CustomerTable";
function CustomerMenu() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <CustomerTable />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default CustomerMenu;
