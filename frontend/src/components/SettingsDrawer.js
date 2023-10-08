import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@mui/material";
import SaveRoomPage from "./SaveRoomPage";


export default function SettingsDrawer({ isHost, guestCanPause, roomCode }) {
    const navigate = useNavigate()
    function handleLeaveButtonClick() {
        fetch("/api/leave-room")
        .then(response => navigate("/"))
    }

    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Room Code: {roomCode}
                </Typography>
            </Grid>
            {isHost ? <SaveRoomPage update={true} /> : null}
            <Grid item xs={12} style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
                <Button variant="contained" color="secondary" onClick={handleLeaveButtonClick}>
                    {isHost ? "Delete Room" : "Leave Room"}
                </Button>
            </Grid>
        </Grid>
    );
}