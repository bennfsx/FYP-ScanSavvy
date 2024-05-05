// Home.jsx

import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import Footer from "../partials/Footer";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate("QRscanner"); // Navigate to the QRscanner screen
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Your main content */}
      <View style={{ flex: 1 }}>
        <Text>Home Screen</Text>
      </View>

      {/* Footer */}
      <Footer onScanPress={handleScanPress} />
    </SafeAreaView>
  );
}
