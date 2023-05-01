import React from "react";
import { Avatar, Badge, ListItemButton, ListItemText, Typography } from "@mui/material";

export default function ContactButton({
  userData,
  selected,
  onClick,
  badgeText,
}) {
  return (
    <ListItemButton
      component="button"
      onClick={onClick}
      selected={selected}
      sx={{ width: "100%", backgroundColor: selected ? "#cfe3ff" : "#fff" }}
    >
      <Avatar
        src={userData?.image}
        sx={{ backgroundColor: "#000", margin: "0 10px 0 0" }}
      />
      <ListItemText primary={`${userData?.firstName} ${userData?.lastName}`} />
      {badgeText ? (
        <Avatar sx={{ bgcolor: "#fc5654", height: 24, width: 24 }}>
          <Typography sx={{fontSize: '14px'}}>{badgeText}</Typography>
        </Avatar>
      ) : null}
    </ListItemButton>
  );
}
