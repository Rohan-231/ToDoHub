import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useActionData } from "react-router-dom";
import "./App.css";


import Task from "./components/task";

const App = () => {

     return (
          <>
          <center>
          <h2>OnTrack</h2>
          <h4>Kal Kare So Aaj Kar, Aaj Kare So Ab</h4>
          </center>
          <Task/>
          </>     
     );
};

export default App;
