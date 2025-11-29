import React from "react";

// reactstrap components
import { Row, Spinner } from "reactstrap";
import ProfileInfo from "./ProfileInfo";
import ProfileEdit from "./ProfileEdit";
import { useUser } from "../auth/authHooks/useUser";
function ProfileMenu() {
  const { isLoading, user } = useUser();
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="content">
        <Row>
          <ProfileInfo user={user} />
          <ProfileEdit user={user} />
        </Row>
      </div>
    </>
  );
}

export default ProfileMenu;
