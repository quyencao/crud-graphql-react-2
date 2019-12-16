import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import EditTodoForm from '../../components/EditTodoForm';

const UPDATE_TODO = gql`
    mutation updateTodo($id: ID!, $input: UpdateTodoInput!){
    updateTodo(id: $id, input: $input){
        id
        text
        completed
    }
}
`;

function UpdateTodo(props) {
    const [updateTodo, { data }] = useMutation(UPDATE_TODO);

    return (
        <Fragment>
            <EditTodoForm
                setEditing={props.setEditing}
                currentTodo={props.currentTodo}
                updateTodo={(id, todo) => updateTodo({ 
                    variables: { id, input: todo },
                    optimisticResponse: {
                        __typename: "Mutation",
                        updateTodo: {
                            id: id,
                            __typename: "Todo",
                            text: todo.text,
                            completed: todo.completed
                        }
                    }
                })}
            />
        </Fragment>
    )
}

export default UpdateTodo;