// Home.jsx

import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import Footer from "../partials/Footer";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate("QRscanner"); // Navigate to the QRscanner screen
  };

  const handleAccountPress = () => {
    navigation.navigate("Account"); // Navigate to My Account screen
  }

  const username = "Jane Tan Jun Ting";

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Your main content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 36, fontWeight: '500', paddingHorizontal: 20, marginTop: 10}}>Welcome</Text>
        <Text style={{ fontSize: 28, paddingHorizontal: 20}}>{username}</Text>
        {/* Grey box in the middle */}
        <View style={ styles.greybox }>
          <Text>Featured Websites</Text>
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
    }
});
