import { Button, Grid, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";

export default function Room() {
    const params = useParams();
    const navigate = useNavigate();
    const [guestCanPause, setGuestCanPause] = useState();
    const [votesToSkip, setVotesToSkip] = useState();
    const [isHost, setIsHost] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    fetch("/api/join-room?code=" + params.roomCode)
    .then(async response => {
        if (response.ok) {
            const data = await response.json()
            setGuestCanPause(data.guest_can_pause.toString())
            setVotesToSkip(data.votes_to_skip)
            setIsHost(data.is_host)
        } else {
            navigate('/')
        }
    });

    function handleLeaveButtonClick() {
        fetch('/api/leave-room')
        .then(response => navigate('/'))
    }

    function renderSettingsButton() {
        return (
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={() => setShowSettings(true)}>
                    Settings
                </Button>
            </Grid>
        );
    }

    function renderSettings() {
        return (
            <Grid container spacing={1} align="center">
                <Grid item xs={12}>
                    <CreateRoomPage update={true} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={() => setShowSettings(false)}>
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    if (showSettings) {
        return renderSettings();
    }
    return (
        <Grid container spacing={1} align="center">
            {isHost ? renderSettingsButton() : null}
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">
                    Code: {params.roomCode}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Votes: {votesToSkip}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" component="h6">
                    Guest Authorised: {guestCanPause}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" onClick={handleLeaveButtonClick}>Leave Room</Button>
            </Grid>
        </Grid>
    );
}