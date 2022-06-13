import { View, ScrollView, Text, ImageBackground } from "react-native";
import tw from "twrnc";

const image = { uri: "https://www.awrestaurants.co.id/images/anwbearanimation-1.gif" };

export default function Contact() {
    return (
        <View>
            <ImageBackground source={image} resizeMode="contain">
                <View style={tw`h-full items-center p-12 pt-40`}>
                    <ScrollView>
                        {/* <View style={tw`bg-amber-500 w-96 mb-6 p-6 rounded-lg items-center`}> */}
                            {/* <Text>MENU</Text> */}
                        {/* </View> */}
                    </ScrollView>
                </View>
                </ImageBackground>
        </View>
    );
}
