import {
  Button,
  Box,
  Container,
  TextField,
  Typography,
  Autocomplete,
  Grid,
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
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} mt={2}>
          <Typography variant="h5" gutterBottom align="center">
            User Profile
          </Typography>
        </Grid>
        <Grid item xs={12} mr={3} ml={3}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} display={"flex"} gap={2}>
              <Grid item xs={4}>
                <TextField
                  label="First Name"
                  fullWidth
                  margin="normal"
                  {...register("firstName")}
                  disabled={formDisabled}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Last Name"
                  fullWidth
                  margin="normal"
                  {...register("lastName")}
                  disabled={formDisabled}
                />
              </Grid>

              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid item xs={12} display={"flex"} gap={2}>
              <Grid item xs={4}>
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  {...register("email")}
                  disabled={formDisabled}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Phone"
                  fullWidth
                  margin="normal"
                  {...register("phone")}
                  disabled={formDisabled}
                />
              </Grid>

              <Grid item xs={4}>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="Date of Birth"
                        disabled={formDisabled}
                        value={field.value}
                        onChange={(date) =>
                          field.onChange(date ? dayjs(date) : null)
                        }
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
              </Grid>

              <Grid item xs={4}>
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
              </Grid>
            </Grid>

            <Grid item xs={12} display={"flex"} gap={2}>
              <Grid item xs={4}>
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
              </Grid>

              <Grid item xs={4}>
                <TextField
                  label="Bio"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={1}
                  {...register("bio")}
                  disabled={formDisabled}
                />
              </Grid>
            </Grid>

            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              {formDisabled ? (
                <Grid item xs={5}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => setFormDisabled(false)}
                  >
                    Edit Profile
                  </Button>
                </Grid>
              ) : (
                <Grid item xs={5}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>

          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            gap={1}
            mt={2}
          >
            <Grid item xs={5}>
              {selectedImage ? (
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
              ) : (
                <Grid item xs={5}>
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
                </Grid>
              )}
            </Grid>

            <Grid item xs={2}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate("/updatePwd")}
              >
                Update Password
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
