import { Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlayerBar from "./PlayerBar";
import SearchAppBar from "./SearchAppBar";

export default function RoomPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [isHost, setIsHost] = useState();
    const [guestCanPause, setGuestCanPause] = useState();
    const [searchResults, setSearchResults] = useState();

    fetch("/api/join-room?code=" + params.roomCode)
    .then(async response => {
        if (response.ok) {
            const data = await response.json()
            setGuestCanPause(data.guest_can_pause.toString())
            setIsHost(data.is_host)
        } else {
            navigate('/')
        }
    });

    function renderSearchResults() {
        
    }

    return (
        <Grid container spacing={1} align="center">
            <SearchAppBar isHost={isHost} guestCanPause={guestCanPause} roomCode={params.roomCode} setSearchResults={setSearchResults} />
            {searchResults ? renderSearchResults() : null}
            <PlayerBar coverSrc={"coverSrc"} coverAlt={"coverAlt"} artist={"artist"} album={"album"} title={"title"} duration={300} />
        </Grid>
    );
}