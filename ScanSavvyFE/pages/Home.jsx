import { React, useEffect, useRef, useState } from "react";
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
  const { user, checkSession } = useUser(); // Provide a default value for user
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
  });

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
      console.log(response);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    checkSession();
  }, []);
  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate("QRscanner"); // Navigate to the QRscanner screen
  };

  const handleAccountPress = () => {
    navigation.navigate("Account"); // Navigate to My Account screen
  };

  // Retrieve the count for vendors and users to display
  const vendorCount = 5;
  const userCount = 39;

  const logos = [
    { id: 1, source: require("../assets/image/scansavvyTrans.png") },
    { id: 2, source: require("../assets/image/scansavvyTrans.png") },
    { id: 3, source: require("../assets/image/scansavvyTrans.png") },
    { id: 4, source: require("../assets/image/scansavvyTrans.png") },
    { id: 5, source: require("../assets/image/scansavvyTrans.png") },
    { id: 6, source: require("../assets/image/scansavvyTrans.png") },
  ];

  // Function to render each row of logos
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map((logo) => (
        <View key={logo.id} style={styles.logoContainer}>
          <Image source={logo.source} style={styles.logo} />
        </View>
      ))}
    </View>
  );

  // Convert logos array into array of arrays with 3 logos each
  const rows = [];
  for (let i = 0; i < logos.length; i += 3) {
    rows.push(logos.slice(i, i + 3));
  }

  const favrows = [];
  for (let i = 0; i < Math.min(logos.length, 3); i += 3) {
    favrows.push(logos.slice(i, i + 3));
  }
  if (user.userType === "user") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Your main content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "500",
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            Welcome
          </Text>
          <Text style={{ fontSize: 30, paddingHorizontal: 20 }}>
            {`${formData.firstName} ${formData.lastName}!`}
          </Text>
          {/* Grey box in the middle */}
          <View style={styles.greybox}>
            <View style={styles.headerContainer}>
              <Text style={styles.content}>Featured Websites</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("SuccessMsg")}
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
              data={favrows}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRow}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.content}>History</Text>
          </View>
          <View style={styles.container}>
            <FlatList
              data={favrows}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRow}
            />
          </View>
        </View>

        {/* Footer */}
        <Footer
          onScanPress={handleScanPress}
          onAccountPress={handleAccountPress}
        />
      </SafeAreaView>
    );
  } else if (user.userType == "admin") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Your main content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 36,
              fontWeight: "500",
              paddingHorizontal: 20,
              marginTop: 10,
            }}
          >
            Welcome
          </Text>
          <Text style={{ fontSize: 30, paddingHorizontal: 20 }}>
            {`${formData.firstName}!`}
          </Text>
          <View style={styles.container2}>
          <View style={styles.boxVendor}>
            <Text style={styles.boxText}>Vendors</Text>
            <Text style={styles.countText}>{vendorCount}</Text>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("VendorMgmt")}>
              <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.boxUser}>
            <Text style={styles.boxText}>Active Users</Text>
            <Text style={styles.countText}>{userCount}</Text>
            <TouchableOpacity style={styles.arrow} onPress={() => navigation.navigate("UserMgmt")}>
              <MaterialCommunityIcons name="arrow-right" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
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
  favrows: {
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  boxVendor: {
    width: '45%',
    height: 130,
    backgroundColor: '#0070F4',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    position: 'relative',
    elevation: 20,
  },
  boxUser: {
    width: '45%',
    height: 130,
    backgroundColor: '#000000',
    borderRadius: 20,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 10,
    position: 'relative',
    elevation: 5,
  },
  boxText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
  },
  countText: {
    color: '#fff',
    fontSize: 40,
    alignSelf: 'flex-start',
    marginTop: 5,
    fontWeight: 'bold',
  },
  arrow: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});
