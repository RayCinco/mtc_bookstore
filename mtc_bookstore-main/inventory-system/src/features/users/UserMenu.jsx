import React from "react";

// reactstrap components
import { Row, Col } from "reactstrap";
import UserAdd from "./UserAdd";
import UserTable from "./UserTable";
function UserMenu() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <UserTable />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default UserMenu;
