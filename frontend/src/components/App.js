import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import JoinRoomPage from "./JoinRoomPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/join" element={<JoinRoomPage />}/>
                <Route path="/create" element={<CreateRoomPage update={false} />}/>
                <Route path="/room/:roomCode" element={<Room />} />
            </Routes>
        </Router>
    );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);