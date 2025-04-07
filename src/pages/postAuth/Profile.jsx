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
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";

function Profile() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handlePasswordUpdate = async () => {
    navigate("/updatePwd");
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
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
            {...control.register("firstName", {
              required: "First Name is required",
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...control.register("lastName", {
              required: "Last Name is required",
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <Autocomplete
            sx={{ mb: 4, mt: 2 }}
            options={[{ label: "Mr" }, { label: "Mrs" }, { label: "Ms" }]}
            renderInput={(params) => (
              <TextField {...params} label="Title" fullWidth />
            )}
          />

          <Autocomplete
            sx={{ mb: 4 }}
            options={[
              { label: "Male" },
              { label: "Female" },
              { label: "Others" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Gender" fullWidth />
            )}
          />

          <Autocomplete
            sx={{ mb: 4 }}
            options={[{ label: "Single" }, { label: "Married" }]}
            renderInput={(params) => (
              <TextField {...params} label="Marital Status" fullWidth />
            )}
          />

          <TextField
            label="Email ID"
            fullWidth
            margin="normal"
            {...control.register("email", {
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
            {...control.register("phone", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid mobile number",
              },
            })}
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="DOB" sx={{ mb: 4, width: "100%" }} />
          </LocalizationProvider>

          <Autocomplete
            sx={{ mb: 4 }}
            options={[
              { label: "A+" },
              { label: "A-" },
              { label: "B+" },
              { label: "B-" },
              { label: "AB+" },
              { label: "AB-" },
              { label: "O+" },
              { label: "O-" },
            ]}
            renderInput={(params) => (
              <TextField {...params} label="Blood Group" fullWidth />
            )}
          />

          <TextField
            label="Bio"
            fullWidth
            margin="normal"
            {...control.register("bio")}
          />

          {selectedImage && (
            <Box mt={2} textAlign="center">
              <Typography variant="subtitle1">Preview:</Typography>
              <img
                src={selectedImage}
                alt="Uploaded Preview"
                style={{
                  width: "100px",
                  marginTop: "10px",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            component="label"
            sx={{ width: 180, mx: "auto" }}
          >
            Choose Profile Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>

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

      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Button onClick={handlePasswordUpdate}>Update Password</Button>
      </Box>
    </Container>
  );
}

export default Profile;
