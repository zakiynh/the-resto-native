import { Text, StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Home from "../screen/Home";
import Contact from "../screen/Contact";
import DetailScreen from "../screen/DetailScreen";
import tw from "twrnc";
import COLORS from "../src/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNav from "./Tab";

// const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

export default function MainStack() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
                paddingVertical: 8,
                backgroundColor: COLORS.dark,
            }}
        >
            {/* <Tab.Navigator 
            tabBarPosition="bottom" 
            screenOptions={{
                tabBarStyle: {
                    backgroundColor:COLORS.dark,
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 15,
                    height: 50,
                    position: "absolute",
                },
                tabBarLabelStyle: {color:COLORS.amber, fontWeight: "bold"},
                tabBarPressOpacity: 0.8,
                tabBarPressColor: COLORS.dark,
                tabBarActiveTintColor: COLORS.amber,
                tabBarIndicatorStyle: {
                    backgroundColor:COLORS.amber,
                    height: 3,
                    width: "25%",
                    marginLeft: 60,
                },
            }}>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Contact" component={Contact} />
                {/* <Tab.Screen name="Detail" component={DetailScreen} /> */}
            {/* </Tab.Navigator> */}

            <Stack.Navigator>
                <Stack.Screen name="Home" component={TabNav} options = {{headerShown:false}}/>
                <Stack.Screen name="Contact" component={Contact} options = {{headerShown:false}}/>
                <Stack.Screen name="DetailScreen" component={DetailScreen} options = {{headerShown:false}}/>
            </Stack.Navigator>

        </SafeAreaView>
    );
}
