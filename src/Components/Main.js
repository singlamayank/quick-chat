import React, { useEffect, useState } from "react";
import AppCard from "./AppCard";
import MessageBubble from "./MessageBubble";
import { InputAdornment, TextField, Snackbar } from "@mui/material";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachmentIcon from "@mui/icons-material/Attachment";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser, updateChatInState } from "../Redux/chatActions";

function Main() {
  const dispatch = useDispatch();
  const { chats, selectedUser, currentUser, users } = useSelector(
    (state) => state
  );
  const [inputMessage, setInputMessage] = useState("");
  const filteredChats = chats?.filter?.(
    (item) =>
      (item.sender_id === currentUser.id &&
        item.receiver_id === selectedUser.id) ||
      (item.sender_id === selectedUser.id &&
        item.receiver_id === currentUser.id)
  );
  useEffect(() => {
    if (currentUser && users.length) {
      dispatch(
        setSelectedUser(users?.find((user) => user.id !== currentUser.id))
      );
    }
  }, [currentUser, users, dispatch]);
  const onSubmit = (e) => {
    e?.preventDefault();
    if (inputMessage.trim()) {
      dispatch(
        updateChatInState(currentUser.id, selectedUser.id, inputMessage.trim())
      );
      setInputMessage("");
    } else {
      setShowSnackBar(true);
    }
  };
  const [showSnackBar, setShowSnackBar] = useState(false);
  return (
    <AppCard
      height="100%"
      style={{
        margin: "10px 10px",
        flexDirection: "column-reverse",
        display: "flex",
        backgroundColor: "#f3f6fb",
      }}
    >
      <form onSubmit={onSubmit}>
        <AppCard
          width="100%"
          style={{
            backgroundColor: "#fefeff",
            display: "flex",
            alignItems: "center",
            padding: "20px 0",
          }}
        >
          <AttachmentIcon sx={{ p: 1 }} />
          <TextField
            id="filled-basic"
            label="Enter your message here"
            variant="outlined"
            sx={{ width: "100%" }}
            value={inputMessage}
            onChange={(e) => setInputMessage(e?.target?.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SentimentSatisfiedAltIcon sx={{ color: "#fdba00" }} />
                </InputAdornment>
              ),
            }}
            inputProps={{
              style: { padding: 15 },
            }}
            onsub
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ margin: "0 10px", padding: "14px 24px" }}
          >
            Send
          </Button>
        </AppCard>
      </form>

      {filteredChats?.map((chat, index) => {
        return (
          <MessageBubble
            key={chat.timestamp || index}
            alignLeft={chat?.sender_id !== currentUser?.id}
            message={chat.message}
            image={
              chat?.sender_id === currentUser?.id
                ? currentUser.image
                : selectedUser.image
            }
          />
        );
      })}
      <Snackbar
        open={showSnackBar}
        autoHideDuration={3000}
        onClose={() => setShowSnackBar(false)}
        message="Please enter some message"
      />
    </AppCard>
  );
}

export default Main;
