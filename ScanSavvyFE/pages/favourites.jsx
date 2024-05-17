import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  CheckBox,
} from "react-native";
// import CheckBox from "@react-native-community/checkbox"; // Import CheckBox from react-native-community
import axiosAPI from "../axsioAPI";

export default function Favourites({ userID }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch all vendors from the API
    const fetchVendors = async () => {
      try {
        const response = await axiosAPI.post(`/admin/getvendor`);
        console.log("Response data:", response.data); // Check the response data

        // Ensure that response.data is defined and it's an array
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          const vendors = response.data.map((item) => ({
            id: item.siteID,
            label: item.siteName,
            image: { uri: item.logo },
            checked: false,
          }));
          setData(vendors);
        } else {
          console.error("Error: Invalid response data format");
          Alert.alert("Error", "Failed to load vendors. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
        Alert.alert("Error", "Failed to load vendors. Please try again.");
      }
    };

    fetchVendors();
  }, []);

  const toggleCheckbox = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    const checkedCount = updatedData.filter((item) => item.checked).length;
    if (checkedCount <= 3) {
      setData(updatedData);
    } else {
      Alert.alert("Error", "You can only select up to 3 favorites.");
    }
  };

  const handleSaveFavorites = async () => {
    const selectedFavorites = data.filter((item) => item.checked);
    if (selectedFavorites.length === 0) {
      Alert.alert("Error", "Please select at least one favorite.");
      return;
    }

    try {
      await Promise.all(
        selectedFavorites.map((favorite) =>
          axiosAPI.put(`/home/createuserfav/${userID}`, {
            siteID: favorite.id,
          })
        )
      );
      setModalVisible(true);
    } catch (error) {
      console.error("Error saving favorites:", error);
      Alert.alert("Error", "Failed to save favorites. Please try again.");
    }
  };

  const renderItem = ({ item }) => (
    <View>
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => toggleCheckbox(item.id)}
      >
        <Image source={item.image} style={styles.image} />
        <Text style={{ flex: 1 }}>{item.label}</Text>
        <CheckBox
          value={item.checked}
          onValueChange={() => toggleCheckbox(item.id)}
        />
      </TouchableOpacity>
      <View style={styles.line} />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Favourites</Text>
      </View>
      <Text style={styles.subtitle}>
        Select up to 3 shortcuts to access quickly on your homepage.
      </Text>
      <View style={styles.listContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveFavorites}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Updated Favourites Successfully!
            </Text>
            <TouchableOpacity
              style={styles.buttonConfirmation}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#e8ecf4",
    paddingHorizontal: 20,
  },
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
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "300",
    paddingHorizontal: 10,
    marginHorizontal: 12,
  },
  listContainer: {
    padding: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: 130,
    height: 50,
    marginRight: 10,
  },
  line: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "500",
    color: "#fff",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonConfirmation: {
    marginTop: 10,
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 80,
    alignItems: "center",
  },
});
