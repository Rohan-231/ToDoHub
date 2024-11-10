import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useActionData } from "react-router-dom";
import "./App.css";


import Task from "./components/task";

const App = () => {

     return (
          <>
          <h2>OnTrack</h2>
          <h4>Kal Kare So Aaj Kar, Aaj Kare So Ab</h4>
          <Task/>
          </>     
     );
};

export default App;
