// Home.jsx

import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image } from "react-native";
import Footer from "../partials/Footer";
import { useNavigation } from "@react-navigation/native";
// Import your image from the assets folder
import ScansavvyLogo from "../assets/image/scansavvyTrans.png";

export default function Home() {
  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate("QRscanner"); // Navigate to the QRscanner screen
  };

  const handleAccountPress = () => {
    navigation.navigate("Account"); // Navigate to My Account screen
  }

  const firstName = "Jane Tan Jun Ting";
  const logos = [
    { id: 1 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 2 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 3 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 4 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 5 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 6 , source: require('../assets/image/scansavvyTrans.png') },
  ]

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Your main content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 36, fontWeight: '500', paddingHorizontal: 20, marginTop: 10}}>Welcome</Text>
        <Text style={{ fontSize: 30, paddingHorizontal: 20}}>{firstName}</Text>
        {/* Grey box in the middle */}
        <View style={ styles.greybox }>
          <Text style={styles.content}>Featured Websites</Text>
          <View style={styles.container}>
            <FlatList 
              data={rows} 
              keyExtractor={(item, index) => index.toString()} 
              renderItem={renderRow}
            />
          </View>

          
        </View>
      </View>

      {/* Footer */}
      <Footer 
        onScanPress={handleScanPress}
        onAccountPress={handleAccountPress} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    greybox: {
      backgroundColor: '#e8ecf4', 
      height: 300,
      marginTop: 20,
    },
    content: {
      fontSize: 20,
      paddingHorizontal: 20,
      marginTop: 20
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    logoContainer: {
      padding: 10,
    },
    logo: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
    },
});
