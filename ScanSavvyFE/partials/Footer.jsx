import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Footer({ onHomePress, onScanPress, onAccountPress }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={onHomePress}>
        <MaterialCommunityIcons name={"home-account"} size={40} />
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={onScanPress}>
        <MaterialCommunityIcons name={"qrcode-scan"} size={35} />
        <Text style={styles.footerButtonText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={onAccountPress}>
        <MaterialCommunityIcons name={"account"} size={35} />
        <Text style={styles.footerButtonText}>Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});
