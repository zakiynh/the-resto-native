import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import COLORS from "../src/colors";
import { useNavigation } from '@react-navigation/native';

export default function CardFood({food}) {
    const navigation = useNavigation();
    const toDetail = (id) => {
        navigation.navigate('DetailScreen', {id: id});
    }
return (

<View key={food.id} style={tw`p-0.5 w-1/2 h-full`}>
    <TouchableOpacity 
    onPress={() => toDetail(food.id, {})}
    style={[tw`mx-auto h-full`, styles.card]}>
        <Image source={{ uri: food.imgUrl }} style={{ flex: 1, resizeMode: "stretch", borderRadius: 15 }} />
        <View
            style={{
                height: 100,
                alignItems: "flex-start",
            }}
        >
            <Text style={{ fontWeight: "bold", fontSize: 20, marginTop: 10, flex:1 }}>{food.name}</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15, marginTop: 10, flex:1 }}>{food.price}</Text>
        </View>
    </TouchableOpacity>
</View>
)

}

const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    searchBar: {
        height: 50,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    input: {
        fontSize: 18,
        fontWeight: "bold",
        flex: 1,
        color: COLORS.light,
    },
    sortBtn: {
        marginLeft: 10,
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: COLORS.green,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        height: 300,
        width: "90%",
        backgroundColor: COLORS.amber,
        borderRadius: 15,
        marginBottom: 20,
        padding: 10,
    },
});
