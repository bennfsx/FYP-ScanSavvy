import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useUser } from "../hooks/useUser";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Account() {
  const navigation = useNavigation();
  const { logout, user } = useUser();

  const navigatetoEditProfile = () => {
    console.log("Edit Profile");
  };
  const navigatetoChangePwd = () => {
    console.log("Change Password");
  };
  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
    console.log("logout");
  };

  const accountItems = [
    {
      icon: "face-recognition",
      text: "Edit Profile",
      action: navigatetoEditProfile,
    },
    {
      icon: "face-recognition",
      text: "Change Password",
      action: navigatetoChangePwd,
    },
  ];

  const renderSettingsItem = ({ icon, text, action }) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
      }}
    >
      <MaterialCommunityIcons name={icon} size={24} />
      <Text
        style={{
          marginLeft: 36,
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, background: "#e8ecf4" }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 0 }}
        ></TouchableOpacity>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* Edit Profile */}
      <View style={{ marginBottom: 12 }}>
        <View
          style={{
            paddingHorizontal: 20,
            borderRadius: 12,
            backgroundColor: "#e8ecf4",
          }}
        >
          {accountItems.map((item, index) => (
            <React.Fragment key={index}>
              {renderSettingsItem(item)}
              <View style={styles.line} />
            </React.Fragment>
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <View style={{ paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%", // Adjust width as needed
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: "#000",
    borderColor: "#000",
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "600",
    color: "#fff",
  },
});
