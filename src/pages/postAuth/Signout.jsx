import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signoutUser = async () => {
      try {
        // Call the API to sign out the user
        await axios.post("http://localhost:8000/user/signout");
        // Clear any stored user data (e.g., tokens)
        Cookies.remove("isLogin");
        // Redirect to the login page
        navigate("/login");
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
