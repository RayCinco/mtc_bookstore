import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { useForm } from "react-hook-form";

function ProfileEdit({ user }) {
  const { name, email, phone, student_id, role, is_active, created_at } =
    user || {};

  return (
    <Col md="8">
      <Card className="card-user">
        <CardHeader>
          <CardTitle tag="h5">Profile Information</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="12">
              <FormGroup>
                <label>
                  <strong>Full Name</strong>
                </label>
                <p className="form-control-static">{name || "N/A"}</p>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <label>
                  <strong>Email</strong>
                </label>
                <p className="form-control-static">{email || "N/A"}</p>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label>
                  <strong>Phone</strong>
                </label>
                <p className="form-control-static">{phone || "N/A"}</p>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <FormGroup>
                <label>
                  <strong>Role</strong>
                </label>
                <p className="form-control-static text-capitalize">
                  {role || "N/A"}
                </p>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label>
                  <strong>Account Status</strong>
                </label>
                <p className="form-control-static">
                  <span
                    className={`badge badge-${
                      is_active ? "success" : "danger"
                    }`}
                  >
                    {is_active ? "Active" : "Inactive"}
                  </span>
                </p>
              </FormGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ProfileEdit;
