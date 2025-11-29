import { useState, useEffect } from "react";
import {
  FaCamera,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { getCurrentUser } from "../../services/apiAuth";
import { useUpdateAvatar } from "./accountHooks/useUpdateAvatar";
import { useImage } from "../../hooks/useImage";
import Spinner from "../../components/Spinner";
import toast from "react-hot-toast";

function AccountDetails() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localAvatarPreview, setLocalAvatarPreview] = useState(null);
  const { updateAvatar, isUpdating } = useUpdateAvatar();

  // Use useImage to resolve avatar path to public URL
  const { data: avatarUrl } = useImage(user?.avatar);
  const avatarPreview = localAvatarPreview || avatarUrl;

  // sensible defaults matching provided sample values
  const defaultUser = {
    id: 4,
    name: "RAYMOND ABUAN CINCO",
    email: "test@gmail.com",
    student_id: null,
    phone: "09999414107",
    email_verified_at: null,
    active: 1,
    remember_token: null,
    created_at: null,
    updated_at: null,
    avatar: null,
  };

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await getCurrentUser();
        const merged = { ...defaultUser, ...(userData || {}) };
        setUser(merged);
      } catch (error) {
        console.error("Error loading user:", error);
        setUser(defaultUser);
      } finally {
        setIsLoading(false);
      }
    };
    loadUser();
  }, []);

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
        setUser((prev) => ({ ...prev, avatar: data.avatar }));
        setLocalAvatarPreview(null); // Clear local preview, useImage will fetch the new one
      },
      onError: () => {
        setLocalAvatarPreview(null);
      },
    });
  };

  if (isLoading) return <Spinner />;

  // use `user` (merged with defaults) for display
  return (
    <div className="container-fluid" style={{ backgroundColor: "#fff" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div
              className="d-flex flex-column align-items-center py-4 px-3"
              style={{ background: "#fff", borderRight: "1px solid #e9ecef" }}
            >
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#f5f5f5",
                  border: "3px solid #e9ecef",
                }}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                    }}
                  >
                    <FaUser size={60} color="#ccc" />
                  </div>
                )}
              </div>
              <label
                htmlFor="avatar-upload"
                className="btn btn-link mt-3"
                style={{
                  fontSize: 13,
                  color: "#dc3545",
                  textDecoration: "none",
                  fontWeight: "400",
                }}
              >
                <FaCamera className="mr-1" size={12} /> Change photo
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ display: "none" }}
                  disabled={isUpdating}
                />
              </label>
              <h5
                className="mt-3 mb-1"
                style={{ fontWeight: "500", fontSize: "18px", color: "#333" }}
              >
                {user.name}
              </h5>
              <small style={{ color: "#6c757d", fontSize: "13px" }}>
                {user.email}
              </small>
            </div>
          </div>

          <div className="col-md-8">
            <div className="py-4 px-4" style={{ background: "#fff" }}>
              <h4
                className="mb-4"
                style={{ fontWeight: "500", fontSize: "20px", color: "#333" }}
              >
                Account Details
              </h4>
              <table
                className="table"
                style={{ maxWidth: 760, fontSize: "14px" }}
              >
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th
                      style={{
                        fontWeight: "500",
                        color: "#6c757d",
                        padding: "12px 0",
                        fontSize: "13px",
                      }}
                    >
                      Name
                    </th>
                    <td style={{ color: "#333", padding: "12px 0" }}>
                      {user.name}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th
                      style={{
                        fontWeight: "500",
                        color: "#6c757d",
                        padding: "12px 0",
                        fontSize: "13px",
                      }}
                    >
                      Email
                    </th>
                    <td style={{ color: "#333", padding: "12px 0" }}>
                      {user.email}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th
                      style={{
                        fontWeight: "500",
                        color: "#6c757d",
                        padding: "12px 0",
                        fontSize: "13px",
                      }}
                    >
                      Student ID
                    </th>
                    <td style={{ color: "#6c757d", padding: "12px 0" }}>
                      {user.student_id ?? "null"}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th
                      style={{
                        fontWeight: "500",
                        color: "#6c757d",
                        padding: "12px 0",
                        fontSize: "13px",
                      }}
                    >
                      Phone
                    </th>
                    <td style={{ color: "#333", padding: "12px 0" }}>
                      {user.phone ?? "null"}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <th
                      style={{
                        fontWeight: "500",
                        color: "#6c757d",
                        padding: "12px 0",
                        fontSize: "13px",
                      }}
                    >
                      Active status
                    </th>
                    <td style={{ color: "#333", padding: "12px 0" }}>
                      {user.active == 1 ? "Active" : "Inactive"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountDetails;
