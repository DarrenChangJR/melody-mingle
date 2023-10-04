import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, Grid, Typography } from "@material-ui/core";

export default function HomePage() {
    const navigate = useNavigate();
    fetch("/api/user-in-room")
    .then(async response => {
        if (response.ok) {
            const data = await response.json()
            navigate("/room/" + data.code);
        }
    });

    return (
        <Grid container spacing={3} align="center">
            <Grid item xs={12}>
                <Typography variant="h3" component="h3">
                    MelodyMingle
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <ButtonGroup disableElevation variant="contained">
                    <Button color="primary" component={Link} to="/join">
                        Join a Room
                    </Button>
                    <Button color="secondary" component={Link} to="/create">
                        Create a Room
                    </Button>
                </ButtonGroup>
            </Grid>
        </Grid>
    );
}