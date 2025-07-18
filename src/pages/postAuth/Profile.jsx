import {
  Button,
  Box,
  Container,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import Cookies from "js-cookie";
import dayjs from "dayjs";

function Profile() {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formDisabled, setFormDisabled] = useState(true);

  const titleOptions = [{ label: "Mr" }, { label: "Mrs" }, { label: "Ms" }];
  const genderOptions = [
    { label: "Male" },
    { label: "Female" },
    { label: "Others" },
  ];
  const marriedStatusOptions = [{ label: "Single" }, { label: "Married" }];
  const bloodGroupOptions = [
    { label: "A+" },
    { label: "A-" },
    { label: "B+" },
    { label: "B-" },
    { label: "AB+" },
    { label: "AB-" },
    { label: "O+" },
    { label: "O-" },
  ];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // For preview only
      // You can also handle actual upload here if needed
    }
  };

  const getUserData = async () => {
    try {
      const token = Cookies.get("token");
      const userId = JSON.parse(Cookies.get("userData"))?.userId;

      const response = await axios.get(`http://localhost:8000/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data;
      reset({
        firstName: data.first_name || "",
        lastName: data.last_name || "",
        title: titleOptions.find((t) => t.label === data.title) || null,
        gender: genderOptions.find((g) => g.label === data.gender) || null,
        marriedStatus:
          marriedStatusOptions.find((m) => m.label === data.married_status) ||
          null,
        email: data.email || "",
        phone: data.phone || "",
        dob: data.dob ? dayjs(data.dob) : null,
        bloodGroup:
          bloodGroupOptions.find((b) => b.label === data.blood_group) || null,
        bio: data.bio || "",
      });

      if (data.profile_picture) {
        setSelectedImage(data.profile_picture); // Assuming URL from server
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const token = Cookies.get("token");
    const userId = JSON.parse(Cookies.get("userData"))?.userId;

    const formattedData = {
      firstName: data.firstName,
      lastName: data.lastName,
      title: data.title?.label || null,
      gender: data.gender?.label || null,
      marriedStatus: data.marriedStatus?.label || null,
      email: data.email,
      phone: data.phone,
      dob: data.dob ? dayjs(data.dob).format("YYYY-MM-DD") : null,
      bloodGroup: data.bloodGroup?.label || null,
      bio: data.bio,
    };

    try {
      await axios.put(`http://localhost:8000/user/${userId}`, formattedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormDisabled(true);
      await getUserData(); // Refresh form with updated data
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <Typography align="center" mt={5}>
        Loading profile...
      </Typography>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ overflow: "auto", height: "100vh",pb:12 }}>
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center">
          User Profile
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            {...register("firstName")}
            disabled={formDisabled}
          />

          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            {...register("lastName")}
            disabled={formDisabled}
          />

          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={titleOptions}
                disabled={formDisabled}
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
                onChange={(_, value) => field.onChange(value)}
                value={field.value || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Title"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            )}
          />

          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={genderOptions}
                disabled={formDisabled}
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
                onChange={(_, value) => field.onChange(value)}
                value={field.value || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Gender"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            )}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            disabled={formDisabled}
          />

          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            {...register("phone")}
            disabled={formDisabled}
          />

          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  disabled={formDisabled}
                  value={field.value}
                  onChange={(date) => field.onChange(date ? dayjs(date) : null)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "normal",
                    },
                  }}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            name="bloodGroup"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={bloodGroupOptions}
                disabled={formDisabled}
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
                onChange={(_, value) => field.onChange(value)}
                value={field.value || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Blood Group"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            )}
          />

          <Controller
            name="marriedStatus"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={marriedStatusOptions}
                disabled={formDisabled}
                getOptionLabel={(option) => option?.label || ""}
                isOptionEqualToValue={(option, value) =>
                  option?.label === value?.label
                }
                onChange={(_, value) => field.onChange(value)}
                value={field.value || null}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Married Status"
                    fullWidth
                    margin="normal"
                  />
                )}
              />
            )}
          />

          <TextField
            label="Bio"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            {...register("bio")}
            disabled={formDisabled}
          />

          <Box textAlign="center" mt={2}>
            <Button
              component="label"
              variant="contained"
              disabled={formDisabled}
            >
              Upload Image
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
          </Box>

          {selectedImage && (
            <Box mt={2} textAlign="center">
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            </Box>
          )}

          {!formDisabled && (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
              Submit
            </Button>
          )}
        </form>

        {formDisabled && (
          <Button
            type="button"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setFormDisabled(false)}
          >
            Edit Profile
          </Button>
        )}

        <Button
          fullWidth
          sx={{ mt: 2 }}
          variant="outlined"
          onClick={() => navigate("/updatePwd")}
        >
          Update Password
        </Button>
      </Box>
    </Container>
  );
}

export default Profile;
