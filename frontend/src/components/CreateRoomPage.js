import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

export default function CreateRoomPage({ update }) {
    const title = update ? "Update" : "Create Room"
    const [guestCanPause, setGuestCanPause] = useState(true)
    const [votesToSkip, setVotesToSkip] = useState(1)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    function handleCreateButtonClick() {
        if (typeof votesToSkip == "string" && !isNaN(parseFloat(votesToSkip)) && !isNaN((votesToSkip))) {
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    guest_can_pause: guestCanPause,
                    votes_to_skip: votesToSkip,
                }),
            };
            fetch("/api/save-room", requestOptions)
            .then(response => response.json())
            .then(data => navigate("/room/" + data.code));
        } else {
            setError("Please Input a Number!")
        }
    };

    function renderBackButton() {
        return (
            <Grid item xs={12}>
                <Button color="secondary" variant="contained" to="/" component={Link}>
                    Back
                </Button>
            </Grid>
        );
    }

    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography component="h4" variant="h4">
                    {title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormHelperText>
                        Guest Control of Playback State
                    </FormHelperText>
                    <RadioGroup row defaultValue="true" onChange={event => setGuestCanPause(event.target.value === "true")}>
                        <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />
                        <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
                    </RadioGroup>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl>
                    <TextField required error={error.length > 0} helperText={error} type="number" inputProps={{min: 1, style: {textAlign: "center"}}} onChange={event => setVotesToSkip(event.target.value)} />
                    <FormHelperText>
                        Votes Required to Skip Song
                    </FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Button color="primary" variant="contained" onClick={handleCreateButtonClick}>
                    Save
                </Button>
            </Grid>
            {update ? null : renderBackButton()}
        </Grid>
    );
}