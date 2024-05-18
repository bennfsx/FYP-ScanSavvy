import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Footer from "../partials/Footer";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/useUser";
import axiosAPI from "../axsioAPI";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function Home() {
  const { logout, user, checkSession } = useUser();
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState([]);
  const [formData, setFormData] = useState({});
  const [favorites, setFavorites] = useState([]);

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

  const fetchFavourites = async () => {
    try {
      const response = await axiosAPI.post(`/home/getuserfav/${user.userID}`);
      setFavorites(response.data.favorites);
    } catch (error) {
      console.error("Error fetching favourites:", error);
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
    fetchFavourites();
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

  const handleLogoPress = (url) => {
    // Check if the URL starts with "http://" or "https://"
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      // If not, add the "http://" prefix
      url = "http://" + url;
    }
    Linking.openURL(url);
  };

  // Retrieve the count for vendors and users to display
  const [vendorCount, setVendorCount] = useState("");
  const [userCount, setUserCount] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch vendor count
        const vendorResponse = await axiosAPI.post("/admin/vendorcount");
        const fetchedVendorCount = vendorResponse.data.data.vendorCount;
        setVendorCount(fetchedVendorCount);

        // Fetch user count
        const userResponse = await axiosAPI.post("/user/usercount");
        const fetchedUserCount = userResponse.data.data.userCount;
        setUserCount(fetchedUserCount);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };
    fetchCounts();
  }, []);

  // Function to render each row of logos
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map((vendor) => (
        <TouchableOpacity
          key={vendor.siteID}
          onPress={() => handleLogoPress(vendor.siteURL)}
        >
          <View style={styles.logoContainer}>
            <Image source={{ uri: vendor.logo }} style={styles.logo} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Function to render each favorite logo
  const renderFavorite = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleLogoPress(item.siteURL)}
      style={styles.logoContainer}
    >
      <Image source={{ uri: item.logo }} style={styles.logo} />
    </TouchableOpacity>
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
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text
            style={styles.userNameText}
          >{`${formData.firstName} ${formData.lastName}`}</Text>
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
              data={favorites}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderFavorite}
              horizontal={true}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.content}>History</Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={rows} // Assuming you want to show the same vendors for history, change this if needed
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
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    color: "#333", // Dark gray color
  },
  userNameText: {
    fontSize: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
    color: "#555", // Gray color
  },
  greybox: {
    backgroundColor: "#f5f5f5", // Light gray background
    marginTop: 20,
    borderRadius: 15,
    padding: 20,
  },
  content: {
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    fontWeight: "bold",
    color: "#333", // Dark gray color
  },
  container: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center", // Center align the logos
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "flex-start", // Align items to the start (left)
  },
  viewallContent: {
    fontSize: 16,
    marginTop: 20,
    color: "#007bff", // Blue color
    textDecorationLine: "underline",
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
    backgroundColor: "#0070F4", // Blue color
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    elevation: 5,
  },
  boxUser: {
    width: "45%",
    height: 130,
    backgroundColor: "#FF914D", // Orange color
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    elevation: 5,
  },
  boxText: {
    color: "#fff", // White color
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left", // Align text to the left
  },
  countText: {
    color: "#fff", // White color
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center", // Center align the text
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
    backgroundColor: "#007bff", // Blue color
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff", // White color
  },
});
