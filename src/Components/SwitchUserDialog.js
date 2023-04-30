import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import {
  DialogTitle,
  Avatar,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Divider,
  Snackbar,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import ContactButton from "./ContactButton";
import { setCurrentUser } from "../Redux/chatActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function SwitchUserDialog({ open, handleClose }) {
  const currentUser = useSelector((state) => state.currentUser);
  const users = useSelector((state) => state.users);
  const [userSelected, setUserSelected] = useState(null);
  const dispatch = useDispatch();
  const [showSnackBar, setShowSnackBar] = useState(false);
  const onClose = () => {
    setUserSelected(null);
    handleClose();
  };
  const saveChanges = () => {
    if (userSelected) {
      dispatch(setCurrentUser(userSelected));
      onClose();
    } else {
      setShowSnackBar(true);
    }
  };
  return (
    <BootstrapDialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        Switch User
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <div
          style={{
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            margin: "0 auto 10px auto",
            minWidth: "200px",
          }}
        >
          <Avatar
            src={currentUser?.image}
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
              {currentUser?.firstName + " " + currentUser?.lastName}
            </Typography>
          </div>
        </div>
        <Divider />
        <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap" }}>
          {users?.map((user) =>
            user?.id === currentUser?.id ? null : (
              <ContactButton
                key={user.id.toString()}
                userData={user}
                selected={user?.id === userSelected?.id}
                onClick={() => setUserSelected(user)}
              />
            )
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={saveChanges}>
          Save changes
        </Button>
      </DialogActions>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => setShowSnackBar(false)}
        message="Please select a user to proceed"
      />
    </BootstrapDialog>
  );
}

export default SwitchUserDialog;
