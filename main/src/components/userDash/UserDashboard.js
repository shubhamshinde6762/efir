import React, { useEffect } from "react";

const UserDashboard = ({currentUser}) => {
  useEffect(() => {
    const fetch = async () => {
      try {
      } catch (err) {}
    };
    fetch();
  }, [currentUser]);

  return <div>My Complaints</div>;
};

export default UserDashboard;
