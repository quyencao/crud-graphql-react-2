import React, { useState, Fragment } from 'react';
import logo from './logo.svg';
import GetTodos from './graphql/queries/GetTodos';
import './App.css';
import CreateTodo from './graphql/mutations/CreateTodo';
import UpdateTodo from './graphql/mutations/UpdateTodo';

function App() {
  const initialFormState = { id: null, text: '', completed: false }
  const [editing, setEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(initialFormState);

  return (
    <div className="container">
        <h1>Graphql Apollo Sample</h1>
      	<div className="flex-row">
				    <div className="flex-large">
              {editing ? (
                  <Fragment>
                    <h2>Edit todo</h2>
                    <UpdateTodo currentTodo={currentTodo} setEditing={setEditing}/>
                  </Fragment>
                ) : (
                  <Fragment>
                    <h2>Add todo</h2>
                    <CreateTodo />
                  </Fragment>
                )
              }
              </div>
            <div className="flex-large">
                <h2>View todos</h2>
                <GetTodos setEditing={setEditing} setCurrentTodo={setCurrentTodo}/>
            </div>
        </div>
    </div>
  );
}

export default App;
