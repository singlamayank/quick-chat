import React from "react";
import AppCard from "./AppCard";
import { Avatar, Typography, Badge } from "@mui/material";

function MessageBubble({ alignLeft, message, image }) {
  return (
    <div style={{ margin: "10px 0", display: "flex" }}>
      {alignLeft && image ? (
        <div style={{ marginRight: "5px" }}>
          <Badge
            color="success"
            variant="dot"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            overlap="circular"
          >
            <Avatar sx={{ backgroundColor: "#000" }} src={image} />
          </Badge>
        </div>
      ) : null}
      <AppCard
        style={{
          maxWidth: "70%",
          backgroundColor: alignLeft ? "#fff" : "#1a233c",
          margin: alignLeft ? "0 auto 0 0" : "0 0 0 auto",
          display: "table",
          padding: "10px",
        }}
      >
        <Typography sx={{ color: alignLeft ? "#1a233c" : "#fff" }}>
          {message}
        </Typography>
      </AppCard>
      {!alignLeft && image ? (
        <div style={{ marginLeft: "5px" }}>
          <Badge
            color="success"
            variant="dot"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            overlap="circular"
          >
            <Avatar
              sx={{ backgroundColor: "#000", marginLeft: "5px" }}
              src={image}
            />
          </Badge>
        </div>
      ) : null}
    </div>
  );
}

export default MessageBubble;
