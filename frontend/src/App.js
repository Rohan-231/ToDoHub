import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useActionData } from "react-router-dom";
import "./App.css";

// pages
import Task from "./components/task";

const App = () => {

     return (
          <>
          <Task/>
          </>     
     );
};

export default App;
