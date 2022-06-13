import { ImageBackground, StyleSheet, View, Text, SafeAreaView, ScrollView } from "react-native";
import tw from "twrnc";
import React from "react";
import MainStack from "./navigation/MainStack";
import { NavigationContainer } from "@react-navigation/native";
import client from "./config/apollo";
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from "@apollo/client";


const MyComponent = () => {
    return (
        <ApolloProvider client={client}>
            <NavigationContainer>
                <MainStack />
            </NavigationContainer>
        </ApolloProvider>
    );
};

export default MyComponent;