import React from 'react';
import AppCard from './AppCard';
import MessageBubble from "./MessageBubble";
import { InputAdornment, TextField } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import AttachmentIcon from '@mui/icons-material/Attachment';
import Button from '@mui/material/Button';
import SendIcon from "@mui/icons-material/Send";
import { useDispatch, useSelector } from 'react-redux';

function Main() {
    const dispatch = useDispatch();
    const selectedUser = useSelector((state) => state.selectedUser);
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
            />
            <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ margin: "0 10px", padding: "14px 24px" }}
            >
            Send
            </Button>
        </AppCard>
        <MessageBubble />
        <MessageBubble alignLeft />
        </AppCard>
    );
}

export default Main