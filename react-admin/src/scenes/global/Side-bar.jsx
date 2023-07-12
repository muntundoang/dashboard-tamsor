import { useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  sidebarClasses,
  menuClasses,
} from "react-pro-sidebar";
import {
  Box,
  IconButton,
  Typography,
  iconButtonClasses,
  useTheme,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { store } from "../../store";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  if (selected === title) {
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
          backgroundColor: "#868dfb",
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  } else {
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() => setSelected(title)}
        icon={icon}
        component={<Link to={to} />}
      >
        <Typography>{title}</Typography>
      </MenuItem>
    );
  }
};

const Sidebarmenu = () => {
  const { user, postAbsen } = store((state) => state);
  const { collapseSidebar, collapsed } = useProSidebar();
  const [selected, setSelected] = useState("Dashboard");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handlerAbsen = (e) => {
    if (e) {
      e.preventDefault();
    }
    const respond = postAbsen();
    console.log("respond handlerAbsen ==> ", respond);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        minHeight: 0,
      }}
    >
      <Sidebar
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            background: `${colors.primary[400]} !important`,
          },
          [`.ps-menu-button:hover`]: {
            backgroundColor: "#6870fa",
          },
          [`.${iconButtonClasses.colorPrimary}`]: {
            backgroundColor: "transparant !important",
          },
          [`.${menuClasses.open}`]: {
            color: "#868dfb !important",
          },
        }}
      >
        <Menu
          rootStyles={{
            [`.css-1l8icbj`]: {
              paddingRight: "5px",
              paddingLeft: "5px",
            }
          }}
        >
          <main>
            <MenuItem
              icon={
                collapsed ? (
                  <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                ) : undefined
              }
              style={{
                margin: "10px 0 10px 0",
                color: colors.grey[100],
                cursor: "default",
              }}
            >
              {!collapsed && (
                <Box display="flex" justifyContent="start" alignItems="center">
                  <IconButton onClick={() => collapseSidebar()}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>
            {!collapsed && (
              <Box mb="25px">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="100px"
                    height="100px"
                    src={user.photo}
                    style={{ borderRadius: "50%", objectFit: "contain" }}
                  />
                </Box>
                <Box
                  textAlign="center"
                  sx={{
                    cursor: "default",
                  }}
                >
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="h5"
                    textTransform={"uppercase"}
                    color={colors.greenAccent[300]}
                  >
                    {user.role}
                  </Typography>
                </Box>
              </Box>
            )}
          </main>
          <Box paddingLeft={collapsed ? undefined : "10%"}>
            <Button
              sx={{
                width: "100%",
                marginBottom: "15px",
                padding: "10px",
                background: colors.greenAccent[700],
              }}
              onClick={(e) => handlerAbsen(e)}
            >
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {user.isCheckIn ? "Check Out" : "Check In"}
              </Typography>
            </Button>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Log Absen"
              to="/logAbsen"
              icon={<NotesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* {user.role === "admin" && (
              <>
                <Typography
                  variant="h6"
                  color={colors.grey[300]}
                  sx={{ m: "5px 0 5px 20px" }}
                >
                  Data
                </Typography>
                <Item
                  title="Manage Team"
                  to="/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Contacts Information"
                  to="/contacts"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Invoices Balances"
                  to="/invoices"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            )} */}

            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Pages
            </Typography>
            <Item
              title="Stock Control"
              to="/inventory"
              icon={<Inventory2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Register User"
              to="/register"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Charts
            </Typography>
            <Item
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Geography Chart"
              to="/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebarmenu;
