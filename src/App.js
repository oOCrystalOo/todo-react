import './App.scss';
import React, { useState, useRef } from 'react';

export default function App() {
  const [ todo, setTodo ] = useState( [] );
  const inputRef = useRef();

  const handleAdd = e => {
    e.preventDefault();
    const toAdd   = e.target.elements.toAdd;
    if ( toAdd ) {
      const value = toAdd.value;
      if ( value && value.length ) {
        const item = { text: value, done: false };
        setTodo( previousToDo => { return previousToDo.concat( item ) } );
        inputRef.current.value = '';
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title">To Do</h1>
      <ToDoList items={todo} setTodo={setTodo} />
      
      <form onSubmit={(e) => handleAdd(e)}>
        <input type="text" name="toAdd" placeholder="Something to do..." ref={ inputRef } />
        <br />
        <input type="submit" value="Add Item" />
      </form>
    </div>
  );
}

function ToDoList ( { items, setTodo } ) {
  return (
    items && items.length ? 
        <ul className="list"> {
          items.map( ( item, index ) => {
            return <ListItem key={index} index={index} item={item} setTodo={setTodo} />
          } ) } 
        </ul>: <p>WooHoo! Everything's completed!</p>
  )
}

function ListItem ( { item, index, setTodo } ) {
  const [ checked, setChecked ] = useState( item.done );
  const handleClick = e => {
    setChecked( !checked );
  }
  const deleteToDo = ( e ) => {
    if ( window.confirm( 'Are you sure you want to delete this item?' ) ) {
      setTodo( previousToDo => { return previousToDo.filter( ( item, itemIndex ) => itemIndex !== index ) } );
    }
  }

  return (
    <li className={`item ${ checked ? `completed` : '' }`}>
      <span onClick={ (e) => { handleClick(e)} }>{ item.text }</span>
      <span className="delete" onClick={ deleteToDo }>x</span>
    </li>
  );
}