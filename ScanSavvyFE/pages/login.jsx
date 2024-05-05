import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Login() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20, color: "orange" }}>
        scansavvy technology
      </Text>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Sign in to your account
      </Text>

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Your Email"
      />

      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={{ backgroundColor: "orange", padding: 10, alignItems: "center" }}
      >
        <Text style={{ color: "white" }}>Sign in</Text>
      </TouchableOpacity>

      <Text style={{ marginTop: 20, color: "blue" }}>Forgot Password?</Text>

      <Text style={{ marginTop: 10 }}>
        Don't have an account yet?
        <Text style={{ color: "blue" }}> Sign up</Text>
      </Text>
    </View>
  );
}
