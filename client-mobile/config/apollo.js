import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://p3-orchestrator-c2.herokuapp.com",
    cache: new InMemoryCache(),
});

export default client;
