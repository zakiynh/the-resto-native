import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import COLORS from "../src/colors";

export default function Categories() {
    const [catergoryIndex, setCategoryIndex] = useState(0);
    const categories = ['ALL', 'CHICKEN', 'BURGER', 'DESSERT', 'ROOT BEER'];
    return (
        <View style={styles.categoryContainer}>
            {categories.map((item, index) => (
                <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setCategoryIndex(index)}>
                    <Text style={[styles.categoryText, catergoryIndex === index && styles.categoryTextSelected]}>{item}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 20,
        marginRight: 30,
        marginLeft: 30,
        justifyContent: "space-between",
    },
    categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
    categoryTextSelected: {
        color: COLORS.amber,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: COLORS.amber,
    },
});
