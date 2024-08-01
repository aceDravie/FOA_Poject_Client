import React, { useEffect, useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams, useNavigate, Link } from "react-router-dom";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { AuthContext } from "../contexts/AuthContext";
import Avatar from "@mui/material/Avatar";
import { Person } from "@mui/icons-material";
import Profile from "./Profile";
import TempOrdersDialog from "../mods/TempOrdersDialog";
const settings = ["Profile", "Logout"];
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [tempOrdersCount, setTempOrdersCount] = useState(0);
  const [tempOrders, setTempOrders] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const { clientID } = useParams();
  const { currentUser, dispatch } = useContext(AuthContext);
  const [openChangeProfile, setOpenChangeProfile] = useState(false);
  const navigate = useNavigate();

  const handleOpenChangeProfile = () => {
    setOpenChangeProfile(true);
  };

  const handleCloseChangeProfile = () => {
    setOpenChangeProfile(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };
  const handleOpenDialog = () => {
    setDialogOpen(true);
    
  };

  const handleRemoveOrder = async (index) => {
    const order = tempOrders[index];
    setTempOrders(tempOrders.filter((_, i) => i !== index));
    setTempOrdersCount(tempOrdersCount - 1);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Scroll down
        setShowNavbar(false);
      } else {
        // Scroll up
        setShowNavbar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    navigate("/login");
  };

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      handleLogout();
    } else if (setting === "Profile") {
      handleOpenChangeProfile();
    }
    handleCloseUserMenu();
  };
  return (
    <div className="top">
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: "#333",
          alignItems: "center",
          top: showNavbar ? "0" : "-64px",
          transition: "top 0.3s",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <LocalDiningIcon
              sx={{
                display: { xs: "none", md: "flex" },
                color: "#fac637",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/dashboard"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "#fac637",
                textDecoration: "none",
              }}
            >
              DRACE
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#fcfbf7",
                      p: 1,
                      borderRadius: 2,
                    }}
                  >
                    <Typography
                      mr={2}
                      textAlign="center"
                      sx={{ fontWeight: "bold", fontSize: 12 }}
                    >
                      Hello{" "}
                      <span
                        style={{
                          marginLeft: "1px",
                          textTransform: "capitalize",
                        }}
                      >
                        {firstName}
                      </span>
                    </Typography>
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
            <LocalDiningIcon
              sx={{ display: { xs: "flex", md: "none" }, color: "#fac637" }}
            />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to= "/dashboard"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 700,
                color: "#fac637",
                textDecoration: "none",
              }}
            >
              DRACE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fcfbf7",
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <IconButton>
                <Avatar
                
                 alt="Profile Picture"
                    sx={{ width: 27, height: 27, bgcolor: "#6439ff" }}
                  >
                   
                  </Avatar>
                </IconButton>
                <Typography
                  noWrap
                  component="div"
                  sx={{
                    color: "#333",
                    fontWeight: "bold",
                    mx: 1,
                    fontSize: 15,
                  }}
                >
                  Hello{" "}
                  <span
                    style={{
                      marginLeft: "1px",
                      textTransform: "capitalize",
                    }}
                  >
                    {firstName}
                  </span>{" "}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open Cart">
                <IconButton
                  onClick={handleOpenDialog}
                  sx={{ p: 0 }}
                  size="small"
                >
                  <Badge badgeContent={tempOrdersCount} color="primary">
                    <ShoppingCartIcon color="action" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="My Orders">
                <IconButton component={Link} to={"orders"}>
                  <PlaylistAddCheckIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton  onClick={handleOpenUserMenu}>
                  <ManageAccountsIcon/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleMenuItemClick(setting)}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <TempOrdersDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        tempOrders={tempOrders}
        onRemoveOrder={handleRemoveOrder}
      />
      <Profile
        open={openChangeProfile}
        onOpen={handleOpenChangeProfile}
        onClose={handleCloseChangeProfile}
      />
    </div>
  );
};

export default Navbar;
