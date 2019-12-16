import React from 'react'
import DeleteTodo from '../graphql/mutations/DeleteTodo'

const TodoTable = props => (
  <table>
    <thead>
      <tr>
        <th>Text</th>
        <th>Completed</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.todos.length > 0 ? (
        props.todos.map(todo => (
          <tr key={todo.id}>
            <td>{todo.text}</td>
            <td>{todo.completed ? "Yes" : "No"}</td>
            <td>
              <button
                onClick={() => {
                  props.setEditing(true);
                  props.setCurrentTodo(todo);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <DeleteTodo id={todo.id} /> 
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No users</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default TodoTable