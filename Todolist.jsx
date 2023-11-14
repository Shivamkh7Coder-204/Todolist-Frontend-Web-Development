// Todolist.jsx
import React from 'react';
import "./App.css";

const Todolist = ({ data, id, onDelete, onEdit }) => {
  return (
    <div>
      <div className='box2'>
        <h3>{data}</h3>
        <button onClick={onDelete}>delete</button>
        <button onClick={onEdit}>edit</button>
      </div>
      <br/>
    </div>
  );
}

export default Todolist;
