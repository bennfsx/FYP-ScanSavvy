import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Footer({ onHomePress, onScanPress, onAccountPress }) {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={onHomePress}>
        <Text style={styles.footerButtonText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={onScanPress}>
        <Text style={styles.footerButtonText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={onAccountPress}>
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
