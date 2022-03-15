import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import User from "./Components/User/User";
import HomeParcels from "./Components/HomeParcels/HomeParcels";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";

function App(props) {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/user" />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/admin" element={<HomeParcels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
