import React from "react";
import { Row, Col, Button, FormGroup, Spinner, Label, Input } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useRegister } from "../users/userHooks/useRegister";
import { useUpdateRole } from "../users/userHooks/useUpdateRole";
function CustomerAdd({ userToEdit, onCloseModal }) {
  const { id: editId, ...editValues } = userToEdit || {};
  const isEditSession = Boolean(editId);
  const { register: registerUser, isRegistering } = useRegister();
  const { updateUserRole, isUpdating } = useUpdateRole();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: isEditSession ? editValues : {},
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Form submitted with data:", data);
    if (isEditSession) {
      updateUserRole(
        { userId: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      const { confirmPassword, ...userData } = data;
      console.log("Registering User:", userData);
      registerUser(userData, {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      });
    }
  };

  const onError = (errors) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <div style={{ maxWidth: "600px" }}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        {/* Name and Student ID */}
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Full Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    id="name"
                    type="text"
                    placeholder="Full Name"
                    disabled={isRegistering || isUpdating || isEditSession}
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <div className="text-danger small mt-1">
                  {errors.name.message}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="student_id">Student ID</Label>
              <Controller
                name="student_id"
                control={control}
                render={({ field }) => (
                  <Input
                    id="student_id"
                    type="text"
                    placeholder="e.g. 112345678"
                    disabled={isRegistering || isUpdating || isEditSession}
                    {...field}
                  />
                )}
              />
              {errors.student_id && (
                <div className="text-danger small mt-1">
                  {errors.student_id.message}
                </div>
              )}
            </FormGroup>
          </Col>
        </Row>

        {/* Phone and Email */}
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="phone">Phone Number</Label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <Input
                    id="phone"
                    type="text"
                    placeholder="e.g 0912-345-6789"
                    disabled={isRegistering || isUpdating || isEditSession}
                    {...field}
                  />
                )}
              />
              {errors.phone && (
                <div className="text-danger small mt-1">
                  {errors.phone.message}
                </div>
              )}
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "This field is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    disabled={isRegistering || isUpdating || isEditSession}
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <div className="text-danger small mt-1">
                  {errors.email.message}
                </div>
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

export default CustomerAdd;
