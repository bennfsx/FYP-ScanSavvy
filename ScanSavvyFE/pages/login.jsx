import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

// Import your image from the assets folder
import ScansavvyLogo from "../assets/image/scansavvyTrans.jpg";

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Replace the text with the image */}
        <Image source={ScansavvyLogo} style={styles.logo} />
      </View>

      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Sign in to your account
      </Text>

      <TextInput style={styles.input} placeholder="Your Email" />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
      />

      <TouchableOpacity style={styles.button}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 400,
    height: 200,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "orange",
    padding: 10,
    alignItems: "center",
  },
});
