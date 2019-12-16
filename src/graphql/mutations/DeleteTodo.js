import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { GET_TODOS } from '../queries/GetTodos';

const DELETE_TODO = gql`
    mutation deleteTodo($id: ID!){
        deleteTodo(id: $id)
    }
`;

function DeleteTodo(props) {
    const [deleteTodo, { data }] = useMutation(DELETE_TODO);

    return (
        <Fragment>
            <button
                onClick={() => deleteTodo({ 
                    variables: { id: props.id },
                    optimisticResponse: {
                        __typename: "Mutation",
                        deleteTodo: {
                            __typename: "Todo",
                            id: props.id
                        }
                    },
                    update: (proxy) => {
                        const data = proxy.readQuery({ query: GET_TODOS });
                        proxy.writeQuery({ query: GET_TODOS, data: {
                            ...data,
                            getTodos: data.getTodos.filter(todo => todo.id !== props.id)
                        }});
                    }
                })}
                className="button muted-button"
            > 
                Delete
            </button>
        </Fragment>
    )
}

export default DeleteTodo;