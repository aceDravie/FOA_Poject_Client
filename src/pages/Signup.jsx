import { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import {
  Button,
  InputAdornment,
  Snackbar,
  IconButton,
  Avatar,
  Alert,
  InputLabel,
  Box,
  Select,
} from "@mui/material";
import { Visibility, VisibilityOff, Person } from "@mui/icons-material";
import { useNavigate, Link, Form } from "react-router-dom";
import Grid from "@mui/material/Grid";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState(null);
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [_open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("error");
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (
      !contact ||
      !lastName ||
      !firstName ||
      !email ||
      !address ||
      !gender ||
      !password
      
    ) {
      setOpen(true);
      setSeverity("error");
      setMessage("All fields required");
    } else navigate("/login");
  };
  const limitContactValue = (e) => {
    const contactValue = e.target.value;
    // Allow only numbers and ensure the length does not exceed the limit
    if (/^\d*$/.test(contactValue) && contactValue.length <= 10) {
      setContact(contactValue);
      setOpen(true);
      setMessage("Contact must be 10 Digits");
    }
  };
  return (
    <form>
      <Box
        sx={{
          height: "95vh",
          backgroundImage:
            'url("https://img.freepik.com/free-photo/high-angle-view-various-vegetables-black-background_23-2147917348.jpg?uid=R109053140&ga=GA1.1.1690857631.1698584058&semt=ais_user")',
         
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundImage:
              'url("https://img.freepik.com/free-photo/fresh-colourful-ingredients-mexican-cuisine_23-2148254294.jpg?t=st=1717899132~exp=1717902732~hmac=986108276f3bb554e3249a7d57849453a595bd96ee731dddc3a27c38f35a83c0&w=1380")',

            height: "90vh",
          }}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "10vh" }}
          >
            <Grid item>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                sx={{ fontWeight: "bold", color: "#333" }}
              >
                SIGNUP
              </Typography>
            </Grid>

            <Grid item>
              <TextField
                required
                size="small"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <Person />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <EmailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                maxLength="10"
                label="Contact"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={contact}
                onChange={limitContactValue}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <AddIcCallIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item>
              <InputLabel sx={{ fontSize: 12 }}>Gender</InputLabel>
              <Select
                sx={{ minWidth: 263 }}
                size="small"
                value={gender}
                label="Gender"
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </Grid>
            <Grid item>
              <TextField
                required
                size="small"
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end">
                        <ContactMailIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Box
              sx={{
                my: 1,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                position="relative"
                src={
                  image
                    ? URL.createObjectURL(image)
                    : ""
                }
                sx={{ width: 130, height: 130 }}
              />
              <input
                id="image"
                type="file"
                label="image"
                style={{ display: "none" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <IconButton sx={{ width: 50, height: 50, mb: 10 }}>
                <label htmlFor="image">
                  <CameraAltIcon sx={{ width: 50, height: 50, mt: 2 }} />
                </label>
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignup}
                sx={{ mb: 0 }}
              >
                SIGNUP
              </Button>
              <Typography marginTop={2} gutterBottom sx={{ color: "#333" }}>
                Already have an account <Link to="/login">Login</Link>
              </Typography>
            </Box>

            <Snackbar
              open={_open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity={severity}>{message}</Alert>
            </Snackbar>
          </Grid>
        </Container>
      </Box>
    </form>
  );
};

export default Signup;
