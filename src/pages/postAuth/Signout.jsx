import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signoutUser = async () => {
      try {
        const token = Cookies.get("token");

        // Call backend to clear server-side cookie (if any logic there)
        await axios.post(
          "http://localhost:8000/user/signout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // if using header
            },
            withCredentials: true, // ⬅️ crucial
          }
        );

        // Clear client-side cookie
        Cookies.remove("token");
        Cookies.remove("userData");

        // Navigate to signin
        navigate("/signin");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    };

    signoutUser();
  }, [navigate]);

  return (
    <div>
      <h2>Signing out...</h2>
    </div>
  );
};

export default Signout;
