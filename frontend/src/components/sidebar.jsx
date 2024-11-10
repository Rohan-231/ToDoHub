import React from "react";

function Sidebar({ setView }) {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <input type="text" placeholder="Search" className="search-bar" />
      <div className="tasks">
        <p onClick={() => setView("Upcoming")}>Upcoming</p>
        <p onClick={() => setView("Today")}>Today</p>
        <p onClick={() => setView("Calendar")}>Calendar</p>
        <p onClick={() => setView("StickyWall")}>Sticky Wall</p>
      </div>
      <div className="lists">
        <h4>Lists</h4>
        <p>Personal</p>
        <p>Work</p>
        <p>List 1</p>
        <button>Add New List</button>
      </div>
      <div className="tags">
        <h4>Tags</h4>
        <button className="tag tag1">Tag 1</button>
        <button className="tag tag2">Tag 2</button>
        <button>+ Add Tag</button>
      </div>
    </div>
  );
}

export default Sidebar;