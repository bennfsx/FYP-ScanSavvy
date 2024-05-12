import { React } from "react";
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
} from "react-native"

export default function Favourites() {
    return (
        <SafeAreaView style={{ flex: 1, background: "#e8ecf4", paddingHorizontal: 20 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Favourites</Text>
            </View>
            <Text style={styles.subtitle}>Select up to 3 shortcuts to access quickly on your homepage.</Text>

        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        flexDirection: "row",
        // justifyContent: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#1d1d1d",
        marginBottom: 12,
        paddingHorizontal: 10,
        marginTop: 10
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 300,
        paddingHorizontal: 10,
        marginHorizontal: 12,

    }
});