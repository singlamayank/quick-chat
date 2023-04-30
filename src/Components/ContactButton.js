import React from 'react';
import { Avatar, ListItemButton, ListItemText } from '@mui/material';

export default function ContactButton({userData, selected, onClick}) {
  return (
    <ListItemButton
      component="button"
      onClick={onClick}
      selected={selected}
      sx={{width: '100%', backgroundColor: selected ? '#cfe3ff' : '#fff'}}
    >
      <Avatar
        src={userData?.image}
        sx={{ backgroundColor: "#000", margin: "0 10px 0 0" }}
      />
      <ListItemText primary={`${userData?.firstName} ${userData?.lastName}`} />
    </ListItemButton>
  );
}
