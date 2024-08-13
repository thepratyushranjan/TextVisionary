import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImageGenerator from './Components/ImageGenerator/ImageGenerator';
import ImageDisplay from "./Components/ImageDisplay/ImageDisplay";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ImageGenerator />} />
                <Route path="/image/:id" element={<ImageDisplay />} />
            </Routes>
        </Router>
    );
};

export default App;