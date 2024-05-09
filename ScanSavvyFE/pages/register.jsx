import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import axiosAPI from "../axsioAPI";

const INPUT_OFFSET = 110;

// Import your image from the assets folder
import ScansavvyLogo from "../assets/image/scansavvyTrans.png";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    mobile: "",
  });

  const handleRegister = async () => {
    try {
      if (!form.firstName || !form.lastName || !form.email || !form.password) {
        alert("All fields are required");
        return;
      }

      const response = await axiosAPI.put("/auth/signup", form); // Send registration data using Axios

      if (response.status === 200) {
        // Registration successful, navigate to login screen
        // (You can implement navigation here)
        alert("Registration successful. Please log in.");
        console.log(response.data);
      } else {
        // Registration failed
        alert(response.data.msg || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e8ecf4" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            {/* Use Image component for the logo */}
            <Image source={ScansavvyLogo} style={{ width: 560, height: 150 }} />
          </View>
        </View>
      </View>

      {/* The form */}
      <View style={styles.form}>
        {/* First Name Field */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            onChangeText={(firstName) => setForm({ ...form, firstName })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.firstName}
          />
        </View>
        {/* Last Name Field */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            onChangeText={(lastName) => setForm({ ...form, lastName })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.lastName}
          />
        </View>
        {/* Email Address Field */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(email) => setForm({ ...form, email })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.email}
          />
        </View>
        {/* Mobile Phone Field */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Mobile Phone</Text>
          <TextInput
            keyboardType="numeric"
            autoCorrect={false}
            onChangeText={(mobile) => setForm({ ...form, mobile })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.mobile}
          />
        </View>
        {/* Password Field */}
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            autoCorrect={false}
            onChangeText={(password) => setForm({ ...form, password })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            secureTextEntry={true}
            value={form.password}
          />
        </View>
        {/* Sign up button */}
        <View style={styles.formAction}>
          <TouchableOpacity onPress={handleRegister}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Sign up</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  headerIcon: {
    alignSelf: "center",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    marginBottom: -100,
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 20,
  },
  formAction: {
    marginVertical: 24,
  },
  formActionSpacer: {
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    position: "absolute",
    width: INPUT_OFFSET,
    lineHeight: 44,
    top: 0,
    left: 0,
    bottom: 0,
    marginHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: "500",
    color: "#c0c0c0",
    zIndex: 9,
  },
  inputControl: {
    height: 44,
    backgroundColor: "#fff",
    paddingLeft: INPUT_OFFSET,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
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
