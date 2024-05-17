import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  StyleSheet,
  View,
  Image,
} from "react-native";
import axiosAPI from "../axsioAPI";

export default function FeaturedWebs() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosAPI.post("/admin/getvendor");
        setVendors(response.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

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

  // Convert vendors array into array of arrays with 3 vendors each
  const rows = [];
  for (let i = 0; i < vendors.length; i += 3) {
    rows.push(vendors.slice(i, i + 3));
  }

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#e8ecf4", paddingHorizontal: 20 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Featured Websites</Text>
      </View>
      <Text style={styles.subtitle}>
        View all the vendors available via ScanSavvy.
      </Text>
      <View style={styles.headerContainer}>
        <View style={styles.container}>
          <FlatList
            data={rows}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderRow}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "300",
    paddingHorizontal: 10,
    marginHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 5,
    margin: 5,
  },
  logoContainer: {
    flex: 3,
  },
  logo: {
    width: 130,
    height: 80,
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
