import React from "react";
import Content from "./components/Content";
import Nav from "./components/Nav";
import { Route, Routes } from "react-router-dom";
import Contact from "./components/contact";
import AdminPage from "./components/AdminPage";
import Players from "./players";
import FootballNews from "./components/footballnews";
import CrudFootballNews from "./components/crudfootballnews";
import CrudPlayers from "./components/crudplayers";
import AllTeams from "./components/allteam";
import TeamFormation from "./components/teamformation";
import LoginWithLocalStorage from "./components/LoginWithLocalStorage";
import AllTeam from "./components/allteam";
import FootballScores from "./components/football_scores";
import Standings from "./components/Standings";
import Topscores from "./components/topscores";
import CrudStudents from "./components/crudstudents";
import AddStudents from "./components/Addstudents";
import AddSubject from "./components/AddSubject";
import CrudSubject from "./components/crudsubject";
import CrudTeachers from "./components/crudteachers";
import AddTeachers from "./components/Addteachers";
import Editsubject from "./components/Editsubject";
import Register from "./components/register";
import Login from "./components/login";
import DeleteSubject from "./components/DeleteSubject";
import CrudUser from "./components/cruduser"; // Import CrudUser component
import AddUser from "./components/Adduser"; // Import AddUser component
const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="contact" element={<Content />} />
        <Route path="AdminPage" element={<AdminPage />} />
        <Route path="players" element={<Players />} />
        <Route path="footballnews" element={<FootballNews />} />
        <Route path="crudfootballnews" element={<CrudFootballNews />} />
        <Route path="crudplayers" element={<CrudPlayers />} />
        <Route path="crudstudents" element={<CrudStudents />} />
        <Route path="addstudents" element={<AddStudents />} />
        <Route path="allteam" element={<AllTeams />} />
        <Route path="teamformation" element={<TeamFormation />} />
        <Route path="LoginWithLocalStorage" element={<LoginWithLocalStorage />} />
        <Route path="allteam" element={<AllTeam />} />
        <Route path="football_scores" element={<FootballScores />} />
        <Route path="Standings" element={<Standings />} />
        <Route path="Topscores" element={<Topscores />} />
        <Route path="addstudents" element={<AddStudents />} />
        <Route path="addsubject" element={<AddSubject />} />
        <Route path="crudsubject" element={<CrudSubject />} />
        <Route path="crudteachers" element={<CrudTeachers />} />
        <Route path="addteachers" element={<AddTeachers />} />
        <Route path="editsubject" element={<Editsubject />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="deletesubject" element={<DeleteSubject />} />
        <Route path="cruduser" element={<CrudUser />} /> {/* Add the Route for CrudUser */}
        <Route path="Adduser" element={<AddUser />} /> {/* Add the Route for AddUser */}
      </Routes>
    </div>
  );
};

export default App;
