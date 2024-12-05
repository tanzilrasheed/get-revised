import React from "react";
import NavBar from "./components/NavBar/NavBar.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Notes from "./pages/Notes/Notes.jsx";
import Revision from "./pages/Revision/Revision.jsx";
import SubjectDetail from "./components/SubjectDetail/SubjectDetail.jsx";



const App = () => {
  return (
    <>
      <Router>
        <NavBar menuItems={[
          { href: "/", label: "Home" },
          { href: "/notes", label: "Notes" },
          { href: "/revision", label: "Revision" },
        ]} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/revision" element={<Revision />} />
          <Route path="/subject-detail" element={<SubjectDetail/>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
