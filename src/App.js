import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import User from "./Components/User/User";
import NavBar from "./Components/NavBar/NavBar";
import HomeParcels from "./Components/HomeParcels/HomeParcels";

function App(props) {
  console.log(props.match);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Navigate to="/user" />} />
        <Route path="/user/*" element={<User />} />
        <Route path="/admin" element={<HomeParcels />} />
        <Route path="/login" element={<HomeParcels />} />
        <Route path="/signup" element={<HomeParcels />} />
      </Routes>
    </div>
  );
}

export default App;
