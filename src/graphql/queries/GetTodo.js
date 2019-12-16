import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_TODO = gql`
    query getTodo($id: ID!){
    getTodo(id: $id){
        id
        text
        completed
    }
}
`;

function GetTodo(props) {
    const { loading, error, data } = useQuery(GET_TODO);

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
        <div>
            <h1>GET_TODO</h1>
        </div>
    )
}

export default GetTodo;