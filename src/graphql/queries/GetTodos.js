import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TodoTable from '../../components/TodoTable';

export const GET_TODOS = gql`
    query getTodos{
    getTodos{
        id
        text
        completed
    }
}
`;

function GetTodos(props) {
    const { loading, error, data } = useQuery(GET_TODOS);

    if (loading) {
        return (
            <div>Loading...</div>
        )
    }

    if (error) {
        return (
            <div>
                { `Error! ${error.message}` }
            </div>
        )
    }

    return (
        <Fragment>
            <TodoTable todos={data.getTodos} setEditing={props.setEditing} setCurrentTodo={props.setCurrentTodo}/>
        </Fragment>
    )
}

export default GetTodos;