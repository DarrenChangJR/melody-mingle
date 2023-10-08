import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import SaveRoomPage from "./SaveRoomPage";
import RoomPage from "./RoomPage";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {
    return (
        <>
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/join" element={<JoinRoomPage />}/>
                    <Route path="/create" element={<SaveRoomPage update={false} />}/>
                    <Route path="/room/:roomCode" element={<RoomPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
        </>
    );
}
    
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);