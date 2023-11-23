import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Prices from "./Prices";
import Subscribe from "./Subscribe";
import Cancel from "./Cancel";
import Account from "./Account";
import Register from "./Register";


function App(props) {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/prices" element={<Prices />} />
                    <Route path="/subscribe" element={<Subscribe />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/account" element={<Account />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

