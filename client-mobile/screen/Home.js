import { useEffect, useState } from "react";
import { View, ScrollView, Text, ImageBackground, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native";
import COLORS from "../src/colors";
import axios from "axios";
import CardFood from "../components/CardFood";
import Categories from "../components/Categories";
import { useQuery } from "@apollo/client";
import { GET_ALL_ITEMS } from "../querries/index";

export default function Home() {
    const { loading, error, data } = useQuery(GET_ALL_ITEMS);
    if (loading)
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>
                    <ActivityIndicator size="large" color="#00ff00" />
                </Text>
            </View>
        );
    if (error) return <Text>Error...</Text>;

    return (
        <View style={{ backgroundColor: COLORS.dark, flex: 1 }}>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: COLORS.white }}>FIND THE BEST FOOD,</Text>
            </View>
            <View style={styles.header}>
                <Text style={{ fontSize: 30, fontWeight: "bold", color: COLORS.white }}>FOR YOU</Text>
            </View>

            <Categories />

            <View style={{ flex: 1 }}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 70,
                    }}
                    numColumns={2}
                    data={data.menus}
                    renderItem={({ item }) => {
                        return <CardFood food={item} />;
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 5,
        flexDirection: "row",
    },
});
