import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import {
  Button,
  Box,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function Profile() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handlePasswordUpdate = async (data) => {
    try {
      console.log("Form Data:", data);
      navigate("/updatePwd");
      // const response = await axios.post(
      //   "http://localhost:8000/user/signup",
      //   data
      // );
      // console.log("After Signup call Resp: " + response.data);
      // if (response.status === 200) {
      //   navigate("/signin"); 
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleImageChange = () => {
    console.log("Upload Img: ");
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Create a preview URL
    }
  }

  const navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = {};

  useEffect(() => { }, []);

  return (
    <div>
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom align="center">
            Profile
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="First Name"
              fullWidth
              margin="normal"
              {...register("firstName", { required: "First Name is required" })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
            <TextField
              label="Last Name"
              fullWidth
              margin="normal"
              {...register("lastName", { required: "Last Name is required" })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />

            <div style={{ display: "flex", gap: "16px", width: "100%" }}>

              <FormControl fullWidth>
                <InputLabel>Title</InputLabel>
                <Select {...register("title")}>
                  <MenuItem value="0">Mr</MenuItem>
                  <MenuItem value="1">Mrs</MenuItem>
                  <MenuItem value="2">Ms</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select {...register("gender")}>
                  <MenuItem value="0">Male</MenuItem>
                  <MenuItem value="1">Female</MenuItem>
                  <MenuItem value="2">Others</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Marital Status</InputLabel>
                <Select {...register("marriedStatus")}>
                  <MenuItem value="0">Single</MenuItem>
                  <MenuItem value="1">Married</MenuItem>
                </Select>
              </FormControl>

            </div>

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
              label="Mobile No."
              fullWidth
              margin="normal"
              {...register("phone", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
              error={!!errors.mobile}
              helperText={errors.mobile?.message}
            />
            <div style={{ display: "flex", gap: "16px", width: "100%" }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="DOB" />
              </LocalizationProvider>
              <FormControl fullWidth>
                <InputLabel>Blood Group</InputLabel>
                <Select labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...register("bloodGroup")}>
                  <MenuItem value="0">A+</MenuItem>
                  <MenuItem value="1">A-</MenuItem>
                  <MenuItem value="2">B+</MenuItem>
                  <MenuItem value="3">B-</MenuItem>
                  <MenuItem value="4">AB+</MenuItem>
                  <MenuItem value="5">AB-</MenuItem>
                  <MenuItem value="6">O+</MenuItem>
                  <MenuItem value="7">O-</MenuItem>
                </Select>
              </FormControl>
            </div>
            <TextField
              label="Bio"
              fullWidth
              margin="normal"
              {...register("bio")}
            />
            <div style={{ display: "grid", gap: "16px", width: "100%" }}>
              {selectedImage && (
                <Box mt={2}>
                  <Typography variant="subtitle1">Preview:</Typography>
                  <img src={selectedImage} alt="Uploaded Preview" style={{ width: "300px", marginTop: "10px", borderRadius: "8px" }} />
                </Box>
              )}
              <Button variant="contained" component="label" sx={{ width: 180, mx: 'auto' }} >
                Choose Profile Image
                <input type="file" accept="image/*" hidden onChange={handleImageChange} />
              </Button>

            </div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Update Profile
            </Button>
          </form>
        </Box>
      </Container>

      <Container maxWidth="sm">
        <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
          <Button onClick={handlePasswordUpdate}>Update Password</Button>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
