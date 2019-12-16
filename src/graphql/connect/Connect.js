import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
    uri: 'https://16n7vq8m2c.execute-api.us-east-1.amazonaws.com/dev/graphql',
    request: (operation) => {
        const token = localStorage.getItem('token')
        operation.setContext({
            headers: {
                authorization: token ? `Bearer ${token}` : ''
            }
        })
    }
});

function Connect(props) {
    return (
        <ApolloProvider client={client}>
            {props.children}
        </ApolloProvider>
    )
}

export default Connect;