import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from "@mui/material/Avatar";
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import AppCard from './AppCard';
import { getWindowDimensions } from '../helper';
import MessageBubble from './MessageBubble';
import Main from './Main';
import { getUsers, setCurrentUser } from '../Redux/chatActions';
import { useDispatch, useSelector } from 'react-redux';
import ContactButton from './ContactButton';
import SideNavUsers from './SideNavUsers';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SwitchUserDialog from './SwitchUserDialog';

const drawerWidth = 240;

export default function AppDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);
  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])
  React.useEffect(() => {
    if(currentUser === null && users?.length){
      dispatch(setCurrentUser())
    }
  },[currentUser, dispatch, users])
  const [openSwitchUserDialog, setOpenSwitchUserDialog] = React.useState(false);
  const drawer = (
    <div>
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
          height={150}
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
                sx={{ backgroundColor: "#000", margin: "0 10px 10px 0" }}
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
                <SettingsOutlinedIcon onClick={() => {setOpenSwitchUserDialog(true)}} />
              </div>
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

  const container = window !== undefined ? () => window().document.body : undefined;

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
          width: { sm: `calc(80% - ${drawerWidth + 20}px)` },
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
          width: "20%",
          display: { sm: "flex", xs: "none" },
          flexDirection: "column",
          marginTop: "10px",
          height: getWindowDimensions().height - 20,
          justifyContent: "space-between",
        }}
      >
        <AppCard
          width={"calc(100% - 20)"}
          height={"20%"}
          style={{ margin: "0px 10px 10px 0" }}
        ></AppCard>
        <AppCard
          width={"calc(100% - 20)"}
          height={"60%"}
          style={{ margin: "0px 10px 0px 0" }}
        ></AppCard>
        <AppCard
          width={"calc(100% - 20)"}
          height={"20%"}
          style={{ margin: "10px 10px 0px 0" }}
        ></AppCard>
      </Box>
      <SwitchUserDialog
        open={openSwitchUserDialog}
        handleClose={() => setOpenSwitchUserDialog(false)}
      />
    </Box>
  );
}