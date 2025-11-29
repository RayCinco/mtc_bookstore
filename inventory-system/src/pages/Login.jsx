import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { useLogin } from "../features/auth/authHooks/useLogin";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login, isLogin } = useLogin();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: credentials.email, password: credentials.password });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f5dc 0%, #e8e4d0 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col lg="4" md="6" sm="8" xs="11">
            <Card
              style={{
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                border: "none",
                borderRadius: "15px",
              }}
            >
              <CardBody style={{ padding: "30px" }}>
                <div className="text-center mb-3">
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      background: "#376453",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 15px",
                    }}
                  >
                    <i
                      className="fas fa-store"
                      style={{ fontSize: "30px", color: "#fff" }}
                    />
                  </div>
                  <h4
                    style={{
                      color: "#376453",
                      fontWeight: "bold",
                      marginBottom: "5px",
                    }}
                  >
                    TYBOOK Inventory
                  </h4>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "13px",
                      marginBottom: "0",
                    }}
                  >
                    Sign in to your account
                  </p>
                </div>

                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={credentials.email}
                      onChange={handleChange}
                      style={{
                        borderRadius: "6px",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        fontSize: "13px",
                      }}
                      required
                      disabled={isLogin}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={credentials.password}
                      onChange={handleChange}
                      style={{
                        borderRadius: "6px",
                        padding: "10px 12px",
                        border: "1px solid #ddd",
                        fontSize: "13px",
                      }}
                      required
                      disabled={isLogin}
                    />
                  </FormGroup>
                  <FormGroup className="text-right">
                    <a
                      href="#forgot"
                      style={{
                        color: "#376453",
                        fontSize: "13px",
                        textDecoration: "none",
                      }}
                    >
                      Forgot Password?
                    </a>
                  </FormGroup>
                  <Button
                    type="submit"
                    disabled={isLogin}
                    style={{
                      width: "100%",
                      background: "#376453",
                      border: "none",
                      borderRadius: "6px",
                      padding: "10px",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginTop: "5px",
                      opacity: isLogin ? 0.7 : 1,
                    }}
                  >
                    {isLogin ? "Signing In..." : "Sign In"}
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
