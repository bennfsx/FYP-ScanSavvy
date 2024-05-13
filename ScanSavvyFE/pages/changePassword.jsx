import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import axiosAPI from "../axsioAPI";
import { useUser } from "../hooks/useUser";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser(); // Assuming you have a hook for accessing user data

  const handleChangePassword = async () => {
    if (!user || !user.userID) {
      console.error("User information not available");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match");
      return;
    }

    try {
      const response = await axiosAPI.patch(
        `user/changeuserpassword/${user.userID}`,
        {
          currentPassword,
          newPassword,
        }
      );

      console.log(response.data);
      setModalVisible(true);
      setErrorMessage(""); // Clear error message
      // Handle success
    } catch (error) {
      console.error("Error changing password:", error);
      setErrorMessage("Current password is incorrect");
      // Handle error
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8ecf4", paddingHorizontal: 20 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>
      </View>

      {/* Error Message */}
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Current Password Field  */}
      <View style={styles.input}>
        <Text style={styles.header}>Current Password</Text>
        <View style={styles.box}>
          <TextInput
            secureTextEntry={true}
            value={currentPassword}
            onChangeText={setCurrentPassword}
            editable={true}
          />
        </View>
      </View>

      {/* New Password Field  */}
      <View style={styles.input}>
        <Text style={styles.header}>New Password</Text>
        <View style={styles.box}>
          <TextInput
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
            editable={true}
          />
        </View>
      </View>

      {/* Confirm Password Field  */}
      <View style={styles.input}>
        <Text style={styles.header}>Confirm Password</Text>
        <View style={styles.box}>
          <TextInput
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            editable={true}
          />
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.input}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Password changed successfully!</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    flexDirection: "row",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  input: {
    flexDirection: "column",
    marginBottom: 6,
  },
  box: {
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 6,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderColor: "#fff",
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007bff",
  },
  errorContainer: {
    backgroundColor: "#f8d7da",
    borderColor: "#f5c6cb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  errorMessage: {
    color: "#721c24",
    fontSize: 14,
  },
});
