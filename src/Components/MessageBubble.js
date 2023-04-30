import React from "react";
import AppCard from "./AppCard";
import { Avatar, Typography } from "@mui/material";

function MessageBubble({ alignLeft, message, image }) {
  return (
    <div style={{ margin: "10px 0", display: "flex" }}>
      {alignLeft && image ? (
        <Avatar
          sx={{ backgroundColor: "#000", marginRight: "5px" }}
          src={image}
        />
      ) : null}
      <AppCard
        style={{
          maxWidth: "70%",
          backgroundColor: alignLeft ? "#000" : "#0004",
          margin: alignLeft ? "0 auto 0 0" : "0 0 0 auto",
          display: "table",
          padding: "10px",
        }}
      >
        <Typography sx={{ color: alignLeft ? "#fff" : "#000" }}>
          {message}
        </Typography>
      </AppCard>
      {!alignLeft && image ? (
        <Avatar
          sx={{ backgroundColor: "#000", marginLeft: "5px" }}
          src={image}
        />
      ) : null}
    </div>
  );
}

export default MessageBubble;
