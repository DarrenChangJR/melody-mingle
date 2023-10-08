import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@mui/material";

export default function SaveRoomPage({ update }) {
    const [guestCanPause, setGuestCanPause] = useState(true)
    const navigate = useNavigate()

    function handleSaveButtonClick() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                guest_can_pause: guestCanPause,
            }),
        };
        fetch("/api/save-room", requestOptions)
        .then(response => response.json())
        .then(data => navigate("/room/" + data.code));
    };


    if (update) {
        return (
            <>
            <Grid item xs={12}>
                <Typography>
                    Update Settings
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <RadioGroup row defaultValue="true" onChange={event => setGuestCanPause(event.target.value === "true")}>
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Pause+Queue Songs" labelPlacement="bottom" />
                        <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={handleSaveButtonClick}>
                    Save
                </Button>
            </Grid>
            </>
        )
    }
    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography component="h4" variant="h4">
                    Create Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormHelperText>
                        What can your guests do?
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={event => setGuestCanPause(event.target.value === "true")}>
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Pause+Queue Songs" labelPlacement="bottom" />
                        <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={handleSaveButtonClick}>
                    Save
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        </Grid>
    );
}