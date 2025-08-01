import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DevTool } from "@hookform/devtools";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Cookies from "js-cookie";
import PostAuthRoute from "../../postAuth";
import { loginUser } from "../../../thunks/auth";

function SignIn() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // console.log("Form Data:", data);

      // Check if already logged in before calling API
      if (Cookies.get("token")) {
        alert("User already logged in.");
        navigate("/dashboard");
        return;
      }

      // Login API call
      const response = await axios.post(
        "http://localhost:8000/user/login",
        data
      );
      // console.log("After Login call Resp:", response.data);

      // If login is successful
      if (response.status === 200 && response.data?.token) {
        Cookies.set("token", response.data.token, { expires: 1 }); // 1 day
        Cookies.set("userData", JSON.stringify(response.data.userData), {
          expires: 1,
        });

        // console.log("Token saved:", Cookies.get("token"));
        // console.log("User data saved:", Cookies.get("userData"));

        navigate("/dashboard");
      } else {
        console.error("Login failed: Token not found in response");
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response?.data || error.message
      );
    }
  };

  // // In SignInPage component
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (token) {
  //     navigate("/dashboard");
  //   }
  // }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email ID"
              fullWidth
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </form>
          <DevTool control={control} />
        </Box>
      </Container>
    </>
  );
}

export default SignIn;
