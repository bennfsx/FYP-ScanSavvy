import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Footer from "../partials/Footer";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/useUser";
import axiosAPI from "../axsioAPI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home() {
  const { logout, user, checkSession } = useUser();
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState([]);

  const fetchUserProfile = async () => {
    try {
      const response = await axiosAPI.get(`user/getuserbyid/${user.userID}`);
      setUserProfile(response.data.data);
      setFormData({
        firstName: response.data.data.firstName,
        lastName: response.data.data.lastName,
        email: response.data.data.email,
        mobile: response.data.data.mobile,
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axiosAPI.post("/admin/getvendor");
      setVendors(response.data.slice(0, 6)); // Get only the first 6 vendors
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchVendors();
    checkSession();
  }, []);

  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate("QRscanner");
  };

  const handleAccountPress = () => {
    navigation.navigate("Account");
  };

  const handleLogout = () => {
    logout();
    navigation.navigate("Login");
  };

  // Function to render each row of logos
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map((vendor) => (
        <View key={vendor.siteID} style={styles.logoContainer}>
          <Image source={{ uri: vendor.logo }} style={styles.logo} />
        </View>
      ))}
    </View>
  );

  // Convert vendors array into array of arrays with 3 logos each
  const rows = [];
  for (let i = 0; i < vendors.length; i += 3) {
    rows.push(vendors.slice(i, i + 3));
  }

  if (user.userType === "user") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text
            style={styles.userNameText}
          >{`${formData.firstName} ${formData.lastName}!`}</Text>
          <View style={styles.greybox}>
            <View style={styles.headerContainer}>
              <Text style={styles.content}>Featured Websites</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("FeaturedWebs")}
              >
                <Text style={styles.viewallContent}>View All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <FlatList
                data={rows}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderRow}
              />
            </View>
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.content}>Favourites</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Favourites")}>
              <Text style={styles.viewallContent}>Edit Favourites</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            <FlatList
              data={rows}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRow}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.content}>History</Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={rows}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRow}
            />
          </View>
        </View>
        <Footer
          onScanPress={handleScanPress}
          onAccountPress={handleAccountPress}
        />
      </SafeAreaView>
    );
  } else if (user.userType === "admin") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userNameText}>{`${formData.firstName}!`}</Text>
          <View style={styles.container2}>
            <View style={styles.boxVendor}>
              <Text style={styles.boxText}>Vendors</Text>
              <Text style={styles.countText}>{vendorCount}</Text>
              <TouchableOpacity
                style={styles.arrow}
                onPress={() => navigation.navigate("VendorMgmt")}
              >
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.boxUser}>
              <Text style={styles.boxText}>Active Users</Text>
              <Text style={styles.countText}>{userCount}</Text>
              <TouchableOpacity
                style={styles.arrow}
                onPress={() => navigation.navigate("UserMgmt")}
              >
                <MaterialCommunityIcons
                  name="arrow-right"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 50 }}>
            <TouchableOpacity onPress={handleLogout}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 36,
    fontWeight: "500",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  userNameText: {
    fontSize: 30,
    paddingHorizontal: 20,
  },
  greybox: {
    backgroundColor: "#e8ecf4",
    height: 300,
    marginTop: 20,
  },
  content: {
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  container: {
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: "5px",
    margin: "5px",
  },
  logoContainer: {
    flex: 3,
  },
  logo: {
    width: 130,
    height: 80,
    margin: "10px",
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  viewallContent: {
    fontSize: 16,
    marginTop: 20,
    color: "#FF914D",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  boxVendor: {
    width: "45%",
    height: 130,
    backgroundColor: "#0070F4",
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    position: "relative",
    elevation: 20,
  },
  boxUser: {
    width: "45%",
    height: 130,
    backgroundColor: "#FF914D",
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    position: "relative",
    elevation: 5,
  },
  boxText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  countText: {
    color: "#fff",
    fontSize: 40,
    alignSelf: "flex-start",
    marginTop: 5,
    fontWeight: "bold",
  },
  arrow: {
    position: "absolute",
    top: 10,
    right: 10,
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
