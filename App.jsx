import React, { useState } from "react";
import "./App.css";
import Todolist from "./Todolist";

function App() {
  const [item, setItem] = useState("");
  const [itemlist, setItemlist] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editedItem, setEditedItem] = useState("");

  const createItem = (e) => {
    console.log(e.target.value);
    setItem(e.target.value);
  };
  
  const additem = () => {
    if (item.trim() !== "") {
      setItemlist([...itemlist, item]);
      setItem("");
      console.log(`Item added: ${item}`);
    }
  };  

  const deleteItem = (id) => {
    console.log("Deleted item at index:", id);
    const updatedList = itemlist.filter((_, index) => index !== id);
    setItemlist(updatedList);
  };

  const editItem = (id, text) => {
    setEditingItem(id);
    setEditedItem(text);
  };

  const saveEditedItem = (id) => {
    const previousItem = itemlist[id];
    const updatedList = itemlist.map((item, index) =>
      index === id ? editedItem : item
    );
    setItemlist(updatedList);
    setEditingItem(null);
    setEditedItem("");
    console.log(`Item at index ${id} changed from "${previousItem}" to "${editedItem}"`);
  };

  const handleKeyPress = (e, index) => {
    if (e.key === "Enter") {
      if (editingItem === index) {
        saveEditedItem(index);
      } else {
        additem();
      }
    }
  };

  return (
    <>
      <div className="container">
        <div className="innerbox">
          <h4>TodoList</h4>

          <div className="box2">
            <div>
              <input
                type="text"
                placeholder="Add New Items"
                value={item}
                onChange={createItem}
                onKeyPress={(e) => handleKeyPress(e, -1)}
              />
            </div>
            <div>
              <button onClick={additem}>Add</button>
            </div>
          </div>

          <div>
            {itemlist.map((item, index) => (
              <div key={index}>
                {editingItem === index ? (
                  <>
                    <input
                      type="text"
                      value={editedItem}
                      onChange={(e) => setEditedItem(e.target.value)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                    />
                    <button onClick={() => saveEditedItem(index)}>Save</button>
                  </>
                ) : (
                  <Todolist
                    data={item}
                    id={index}
                    onDelete={() => deleteItem(index)}
                    onEdit={() => editItem(index, item)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
