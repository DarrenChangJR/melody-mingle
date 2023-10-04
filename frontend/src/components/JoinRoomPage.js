import React, { useState } from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";

export default function JoinRoomPage() {
    const [code, setCode] = useState();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    function handleEnterButtonClick() {
        fetch("/api/join-room?code=" + code)
        .then(response => {
            if (response.ok) {
                navigate("/room/" + code);
            } else {
                setError("Invalid Room Code");
            }
        });
    }
    
    return (
        <Grid container spacing={1} align="center">
            <Grid item xs={12}>
                <Typography component="h4" variant="h4">
                    Join a Room
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Code" variant="outlined" placeholder="Enter a Room Code" helperText={error} error={error.length > 0} onChange={e => setCode(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={handleEnterButtonClick}>Enter Room</Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
            </Grid>
        </Grid>
    );
}