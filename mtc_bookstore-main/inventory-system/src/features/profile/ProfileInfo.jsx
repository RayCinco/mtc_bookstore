import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Spinner,
} from "reactstrap";
import { useUpdateAvatar } from "./profileHooks/useUpdateAvatar";
import { useImage } from "../../hooks/useImage";
import toast from "react-hot-toast";

function ProfileInfo({ user }) {
  const { name, email, phone, role, avatar, is_active } = user || {};
  const [localAvatarPreview, setLocalAvatarPreview] = useState(null);
  const { updateAvatar, isUpdating } = useUpdateAvatar();

  // Use useImage to resolve avatar path to public URL
  const { data: avatarUrl } = useImage(avatar);
  const displayAvatar =
    localAvatarPreview || avatarUrl || "/assets/default-avatar.png";

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setLocalAvatarPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    updateAvatar(file, {
      onSuccess: (data) => {
        setLocalAvatarPreview(null); // Clear local preview, useImage will fetch the new one
      },
      onError: () => {
        setLocalAvatarPreview(null);
      },
    });
  };
  return (
    <Col md="4">
      <Card className="card-user">
        <div className="image">
          <img alt="..." src="/assets/damir-bosnjak.jpg" />
        </div>
        <CardBody>
          <div className="author">
            <div className="position-relative d-inline-block">
              <img
                alt={name}
                className="avatar border-gray"
                src={displayAvatar}
                style={{ opacity: isUpdating ? 0.6 : 1 }}
              />
              <label
                htmlFor="avatar-upload"
                className="btn btn-sm btn-success position-absolute"
                style={{
                  bottom: 0,
                  right: 0,
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: isUpdating ? "not-allowed" : "pointer",
                }}
              >
                <i className="nc-icon nc-camera-compact" />
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  disabled={isUpdating}
                />
              </label>
            </div>
            <h5
              style={{ color: "#6bd098", fontWeight: 600, marginTop: "10px" }}
            >
              {name}
            </h5>
            <p className="description">{email}</p>
          </div>
          <div className="text-center mt-3">
            <p className="mb-2">
              <strong>Phone:</strong> {phone || "N/A"}
            </p>
            <p className="mb-2">
              <strong>Role:</strong>{" "}
              <span className="text-capitalize">{role}</span>
            </p>
            <p className="mb-0">
              <strong>Status:</strong>{" "}
              <span
                className={`badge badge-${is_active ? "success" : "danger"}`}
              >
                {is_active ? "Active" : "Inactive"}
              </span>
            </p>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default ProfileInfo;
