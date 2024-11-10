import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useActionData } from "react-router-dom";
import "./App.css";


import Task from "./components/task";

const App = () => {

     return (
          <>
          <h2>To Do App</h2>
          <Task/>
          </>     
     );
};

export default App;
