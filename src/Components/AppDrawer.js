import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import AppCard from "./AppCard";
import { getWindowDimensions } from "../helper";
import Main from "./Main";
import { getUsers, setCurrentUser } from "../Redux/chatActions";
import { useDispatch, useSelector } from "react-redux";
import SideNavUsers from "./SideNavUsers";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SwitchUserDialog from "./SwitchUserDialog";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import BoltIcon from "@mui/icons-material/Bolt";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import InventoryIcon from "@mui/icons-material/Inventory";
import InsertLinkIcon from "@mui/icons-material/InsertLink";

const drawerWidth = 240;

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 4,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#0f4cff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 8,
    height: 8,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function AppDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const selectedUser = useSelector((state) => state.selectedUser);
  const users = useSelector((state) => state.users);
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  React.useEffect(() => {
    if (currentUser === null && users?.length) {
      dispatch(setCurrentUser());
    }
  }, [currentUser, dispatch, users]);
  const [openSwitchUserDialog, setOpenSwitchUserDialog] = React.useState(false);
  const drawer = (
    <div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          marginLeft: "20px",
        }}
      >
        <BoltIcon
          sx={{
            height: 45,
            width: 45,
            fill: "#0f4cff",
            borderRadius: 25,
            backgroundColor: "#d4e1ff",
          }}
        />
        <Typography
          sx={{
            flexBasis: "100%",
            fontWeight: "bold",
            marginLeft: "15px",
            fontSize: "20px",
            alignSelf: "center",
          }}
        >
          QuickChat
        </Typography>
      </div>
      <div
        style={{
          padding: "10px",
          height: "200px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppCard
          width={"90%"}
          height={170}
          style={{
            display: "flex",
          }}
        >
          {currentUser ? (
            <div
              style={{
                alignSelf: "center",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                margin: "0 auto",
              }}
            >
              <Avatar
                src={currentUser.image}
                sx={{
                  backgroundColor: "#000",
                  margin: "0 10px 10px 0",
                  height: "60px",
                  width: "60px",
                }}
              />
              <div style={{ display: "flex" }}>
                <Typography
                  sx={{
                    flexBasis: "100%",
                    fontWeight: "bold",
                    marginRight: "5px",
                  }}
                >
                  {currentUser.firstName + " " + currentUser.lastName}
                </Typography>
                <SettingsOutlinedIcon
                  onClick={() => {
                    setOpenSwitchUserDialog(true);
                  }}
                />
              </div>
              <Typography
                sx={{
                  flexBasis: "100%",
                  marginRight: "5px",
                  fontSize: "12px",
                  marginTop: "5px",
                }}
              >
                {currentUser?.company?.title}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ marginTop: "5px" }}
              >
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography sx={{ fontSize: 12 }}>Active</Typography>
              </Stack>
            </div>
          ) : null}
        </AppCard>
      </div>
      {/* <Divider /> */}
      <Accordion className="sideNavAccordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Active Conversations</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SideNavUsers />
        </AccordionDetails>
      </Accordion>
      <Accordion className="sideNavAccordian">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Archived Conversations</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: 30, overflow: "scroll" }}>
          <ListItemButton component="a" href="#para2">
            <ListItemText primary="Para 2" />
          </ListItemButton>
        </AccordionDetails>
      </Accordion>
      {/* <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          borderRight: "none",
          display: { sm: "none" },
          height: "56px",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth, borderRight: "none" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth, borderRight: "none" },
            borderRight: "none",
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(75% - ${drawerWidth + 20}px)` },
          height: {
            xs: getWindowDimensions().height - 76,
            sm: getWindowDimensions().height - 20,
          },
          marginTop: { xs: "56px", sm: 0 },
        }}
      >
        <Main />
      </Box>
      <Box
        component="section"
        sx={{
          width: "25%",
          display: { sm: "flex", xs: "none" },
          flexDirection: "column",
          marginTop: "10px",
          height: getWindowDimensions().height - 20,
          justifyContent: "space-between",
        }}
      >
        <AppCard
          width={"calc(100% - 20)"}
          height={"25%"}
          style={{
            margin: "0px 10px 10px 0",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#c3d6ff",
              height: "60px",
              width: "60px",
              color: "#000",
              margin: "5px auto",
            }}
          >{`${selectedUser?.firstName?.slice(
            0,
            1
          )}${selectedUser?.lastName?.slice(0, 1)}`}</Avatar>
          <div style={{ display: "flex", alignItems: "center" }}>
            <MailOutlineIcon sx={{ height: "16px", width: "16px" }} />
            <Typography sx={{ fontSize: "12px", marginLeft: "5px" }}>
              {selectedUser?.email}
            </Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <AccountCircleIcon sx={{ height: "16px", width: "16px" }} />
            <Typography sx={{ fontSize: "12px", marginLeft: "5px" }}>
              {selectedUser?.firstName + " " + selectedUser?.lastName}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button variant="outlined" endIcon={<InventoryIcon />} sx={{backgroundColor: '#fff'}}>
              Archive
            </Button>
          </div>
        </AppCard>
        <AppCard
          width={"calc(100% - 20)"}
          height={"55%"}
          style={{ margin: "0px 10px 0px 0" }}
        ></AppCard>
        <AppCard
          width={"calc(100% - 20)"}
          height={"20%"}
          style={{
            margin: "10px 10px 0px 0",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          <Typography sx={{ textAlign: "center", fontWeight: "bold" }}>
            Onboard Clients
          </Typography>
          <Typography sx={{ textAlign: "center", fontSize: "12px" }}>
            Share the link with prospectus and discuss all the stuff
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <Button
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://www.test.quick-chat.com"
                );
                alert("Link copied!");
              }}
              variant="contained"
              endIcon={<InsertLinkIcon />}
            >
              Copy Link
            </Button>
          </div>
        </AppCard>
      </Box>
      <SwitchUserDialog
        open={openSwitchUserDialog}
        handleClose={() => setOpenSwitchUserDialog(false)}
      />
    </Box>
  );
}
