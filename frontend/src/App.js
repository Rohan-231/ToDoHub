import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useActionData } from "react-router-dom";
import "./App.css";

// pages
// import Projects from "./pages/Projects/";
// import PageNotFound from "./pages/PageNotFound/";
// import ProjectDetails from "./pages/ProjectDetails/";

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