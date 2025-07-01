import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiUrl = process.env.REACT_APP_API_URL;

const client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
});

export default client;
