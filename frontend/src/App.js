import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useActionData } from "react-router-dom";
import "./App.css";

// pages
import Projects from "./pages/Projects/";
import PageNotFound from "./pages/PageNotFound/";
import ProjectDetails from "./pages/ProjectDetails/";
import Task from "./components/task";
import SearchBar from "./components/searchbar";

const App = () => {

     return (
          <>
          <Task/>
          </>     
     );
};

export default App;