import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import ExerTracker from "./components/exerTracker";
import ExercisesList from "./components/exercises-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import UsersList from "./components/users-list";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExerTracker}></Route>
        <Route path="/exercises" exact component={ExercisesList}></Route>
        <Route path="/edit-exercise/:id" exact component={EditExercise}></Route>
        <Route path="/create-exercise" exact component={CreateExercise}></Route>
        <Route path="/users" exact component={UsersList}></Route>
        <Route path="/create-user" exact component={CreateUser}></Route>
      </div>
    </Router>
  );
}

export default App;
