import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import uuid from "uuid/v4";
import { useMutation } from '@apollo/react-hooks';
import AddTodoForm from '../../components/AddTodoForm';
import { GET_TODOS } from '../queries/GetTodos';

const CREATE_TODO = gql`
    mutation createTodo($input: CreateTodoInput!){
    createTodo(input: $input){
        id
        text
        completed
    }
}
`;

function CreateTodo(props) {
    const [createTodo, { data }] = useMutation(CREATE_TODO);

    return (
        <Fragment>
            <AddTodoForm 
                addTodo={(text, completed) => createTodo({
                    variables: { input: { text, completed } },
                    optimisticResponse: {
                        __typename: "Mutation",
                        createTodo: {
                          __typename: "Todo",
                            text,
                            completed,
                            id: uuid()
                        }
                    },
                    update: (proxy, { data: { createTodo: todo } }) => {
                        const data = proxy.readQuery({ query: GET_TODOS });
                        proxy.writeQuery({ query: GET_TODOS, data: {
                          ...data,
                          getTodos: [...data.getTodos, todo]
                        }});
                    } 
                })}
            />
        </Fragment>
    )
}

export default CreateTodo;