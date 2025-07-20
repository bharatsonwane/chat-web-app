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

        await axios.post(
          "http://localhost:8000/user/signout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        Cookies.remove("token");
        Cookies.remove("userData");

        navigate("/signin", { replace: true }); // better redirect
      } catch (error) {
        console.error("Error signing out:", error);
        // Optional: fallback redirect even on error
        navigate("/signin", { replace: true });
      }
    };

    signoutUser();
  }, [navigate]);

  return <h2>Signing out...</h2>;
};

export default Signout;
