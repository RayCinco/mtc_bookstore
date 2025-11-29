import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import ProductTable from "./ProductTable";
import Modal from "../../components/Modal";
import { Button } from "reactstrap";
function ProductMenu() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <ProductTable />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ProductMenu;
