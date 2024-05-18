import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import { useUser } from "../hooks/useUser";
import axiosAPI from "../axsioAPI";

export default function QRscanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    console.log(data);
    axiosAPI
      .post(
        "https://asia-southeast1-qrfyp2024.cloudfunctions.net/fyp-api/scancode",
        {
          codeHash: data,
          userID: user.userID,
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          console.log("Ok");
        } else if (response.status == 409) {
          console.log("Code already has been scanned");
        } else if (response.status == 410) {
          console.log("Code has been expired");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRedirectConfirmation = () => {
    Alert.alert(
      "Redirect Confirmation",
      `Do you want to open the following URL?\n\n${scannedData}`,
      [
        {
          text: "Cancel",
          onPress: () => setScanned(false),
          style: "cancel",
        },
        {
          text: "Open",
          onPress: () => {
            Linking.openURL(scannedData);
            setScanned(false);
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />
      {scanned && (
        <TouchableOpacity
          onPress={handleRedirectConfirmation}
          style={styles.rescanButton}
        >
          <Text style={styles.buttonText}>Tap to Confirm and Redirect</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  camera: {
    flex: 1,
  },
  rescanButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
