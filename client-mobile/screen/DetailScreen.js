import React, { useEffect, useState } from "react";
import { View, ScrollView, ImageBackground, SafeAreaView, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import COLORS from "../src/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { useQuery } from "@apollo/client";
import { GET_ITEMS_ID } from "../querries/index";

export default function DetailScreen({ navigation, route }) {
    const { loading, error, data } = useQuery(GET_ITEMS_ID, {
        variables: { menuDetailId: route.params.id },
    });

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
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.dark,
            }}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back-ios" size={30} style={{ backgroundColor: COLORS.dark, color: COLORS.amber, borderRadius: 5 }} />
                </TouchableOpacity>
                <Icon name="favorite" size={30} style={{ backgroundColor: COLORS.dark, color: COLORS.amber, borderRadius: 5 }} />
            </View>
            <View style={styles.imageContainer}>
                <ImageBackground source={{ uri: data.menuDetail.imgUrl }} resizeMode="stretch" style={{ flex: 1, borderRadius: 30 }} />
            </View>
            <View style={styles.detailsContainer}>
                <View
                    style={{
                        marginLeft: 20,
                        flexDirection: "row",
                        alignItems: "flex-end",
                    }}
                >
                    <View style={styles.line} />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>BEST SELLER</Text>
                </View>
                <View
                    style={{
                        marginLeft: 20,
                        marginTop: 20,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{data.menuDetail.name}</Text>
                    <View style={styles.priceTag}>
                        <Text
                            style={{
                                marginLeft: 15,
                                color: COLORS.white,
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            {data.menuDetail.price}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>Description</Text>
                    <Text
                        style={{
                            color: "grey",
                            fontSize: 16,
                            lineHeight: 22,
                            marginTop: 10,
                        }}
                    >
                        {data.menuDetail.description}
                    </Text>
                    <View
                        style={{
                            marginTop: 20,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <View style={styles.borderBtn}>
                                <Text style={styles.borderBtnText}>-</Text>
                            </View>
                            <Text
                                style={{
                                    fontSize: 20,
                                    marginHorizontal: 10,
                                    fontWeight: "bold",
                                }}
                            >
                                1
                            </Text>
                            <View style={styles.borderBtn}>
                                <Text style={styles.borderBtnText}>+</Text>
                            </View>
                        </View>

                        <View style={styles.buyBtn}>
                            <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}>Buy</Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    imageContainer: {
        flex: 0.45,
        marginTop: 20,
        justifyContent: "center",
    },
    detailsContainer: {
        flex: 0.55,
        backgroundColor: COLORS.light,
        marginHorizontal: 7,
        marginBottom: 80,
        borderRadius: 20,
        marginTop: 20,
        paddingTop: 30,
    },
    line: {
        width: 25,
        height: 2,
        backgroundColor: COLORS.dark,
        marginBottom: 5,
        marginRight: 3,
    },
    priceTag: {
        backgroundColor: COLORS.amber,
        width: 80,
        height: 40,
        justifyContent: "center",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    buyBtn: {
        width: 130,
        height: 50,
        backgroundColor: COLORS.amber,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
    },
    borderBtn: {
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 40,
    },
    borderBtnText: {
        fontWeight: "bold",
        fontSize: 28,
    },
});
