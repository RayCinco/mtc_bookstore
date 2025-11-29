import React from "react";
import { Row, Col, Button, FormGroup, Spinner } from "reactstrap";
import { useForm } from "react-hook-form";
import { useRegister } from "./userHooks/useRegister";
import { useUpdateRole } from "./userHooks/useUpdateRole";
function UserAdd({ userToEdit, onCloseModal }) {
  const { id: editId, ...editValues } = userToEdit || {};
  const isEditSession = Boolean(editId);
  const { register: registerUser, isRegistering } = useRegister();
  const { updateUserRole, isUpdating } = useUpdateRole();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const password = watch("password");

  const onSubmit = (data) => {
    if (isEditSession) {
      updateUserRole(
        { userId: editId, role: data.role },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const { confirmPassword, ...userData } = data;
      registerUser(userData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Name and Phone */}
        <Row>
          <Col md={6}>
            <FormGroup>
              <input
                type="text"
                placeholder="Full Name"
                disabled={isRegistering || isUpdating || isEditSession}
                className="form-control"
                {...register("name", {
                  required: "This field is required",
                })}
              />
              {errors.name && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.name.message}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <input
                type="text"
                placeholder="Phone Number"
                disabled={isRegistering || isUpdating || isEditSession}
                className="form-control"
                {...register("phone", {
                  required: "This field is required",
                })}
              />
              {errors.phone && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.phone.message}
                </span>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Email and Role */}
        <Row>
          <Col md={6}>
            <FormGroup>
              <input
                type="email"
                placeholder="Email"
                disabled={isRegistering || isUpdating || isEditSession}
                className="form-control"
                {...register("email", {
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.email.message}
                </span>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <select
                disabled={isRegistering || isUpdating}
                className="form-control"
                {...register("role", {
                  required: "This field is required",
                })}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
              </select>
              {errors.role && (
                <span style={{ color: "red", fontSize: "0.9em" }}>
                  {errors.role.message}
                </span>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Password and Confirm Password */}
        {!isEditSession && (
          <>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Password"
                    disabled={isRegistering}
                    className="form-control"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <span style={{ color: "red", fontSize: "0.9em" }}>
                      {errors.password.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    disabled={isRegistering}
                    className="form-control"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === password || "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span style={{ color: "red", fontSize: "0.9em" }}>
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </>
        )}

        {/* Buttons */}
        <Row className="mt-3">
          <Col xs={6}>
            <Button
              type="button"
              disabled={isRegistering || isUpdating}
              style={{
                width: "100%",
                background: "#4a4744",
                border: "none",
                color: "#fff",
                fontWeight: "600",
              }}
              onClick={() => {
                reset();
                onCloseModal?.();
              }}
            >
              CANCEL
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              type="submit"
              disabled={isRegistering || isUpdating}
              style={{
                width: "100%",
                background: "#376453",
                border: "none",
                color: "#fff",
                fontWeight: "600",
              }}
            >
              {isRegistering || isUpdating ? (
                <Spinner size="sm" />
              ) : isEditSession ? (
                "UPDATE ROLE"
              ) : (
                "ADD USER"
              )}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default UserAdd;
