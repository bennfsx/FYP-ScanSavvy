import React from "react";
import { 
    SafeAreaView,
    Text,
    FlatList,
    StyleSheet,
    View,
    Image,
} from "react-native";

export default function FeaturedWebs() {
    const logos = [
        { id: 1 , source: require('../assets/image/scansavvyTrans.png') },
        { id: 2 , source: require('../assets/image/scansavvyTrans.png') },
        { id: 3 , source: require('../assets/image/scansavvyTrans.png') },
        { id: 4 , source: require('../assets/image/scansavvyTrans.png') },
        { id: 5 , source: require('../assets/image/scansavvyTrans.png') },
        { id: 6 , source: require('../assets/image/scansavvyTrans.png') },
    ];
    
    // Function to render each row of logos
    const renderRow = ({ item }) => (
        <View style={styles.row}>
            {item.map(logo => (
                <View key={logo.id} style={styles.logoContainer}>
                    <Image source={logo.source} style={styles.logo} />
                </View>
            ))}
        </View>
    );

    // Convert logos array into array of arrays with 3 logos each
    const rows = [];
    for (let i = 0; i < logos.length; i += 3) {
        rows.push(logos.slice(i, i + 3));
    }

    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4", paddingHorizontal: 20 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Featured Websites</Text>
            </View>
            <Text style={styles.subtitle}>View all the vendors available via ScanSavvy.</Text>
            <View style={styles.headerContainer}>
                <View style={styles.container}>
                    <FlatList 
                        data={rows} 
                        keyExtractor={(item, index) => index.toString()} 
                        renderItem={renderRow}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    //     marginHorizontal: 12,
    //     flexDirection: "row",
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#1d1d1d",
        marginBottom: 12,
        paddingHorizontal: 20,
        marginTop: 10
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 300,
        paddingHorizontal: 10,
        marginHorizontal: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        padding: '5px',
        margin: '5px',
    },
    logoContainer: {
        flex: 3,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    logo: {
        width: 130,
        height: 80,
        // margin: '10px',
        resizeMode: 'contain',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
