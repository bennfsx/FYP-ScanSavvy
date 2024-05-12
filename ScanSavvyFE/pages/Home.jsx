// Home.jsx

import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import Footer from "../partials/Footer";
import { useNavigation } from "@react-navigation/native";
// import { useUser } from "./hooks/useUser";


export default function Home() {
  // const { user, checkSession } = useUser(); // Provide a default value for user
  // useEffect(() => {
  //   checkSession();
  // }, []);
  const navigation = useNavigation();

  const handleScanPress = () => {
    navigation.navigate("QRscanner"); // Navigate to the QRscanner screen
  };

  const handleAccountPress = () => {
    navigation.navigate("Account"); // Navigate to My Account screen
  }

  const firstName = "Jane Tan Jun Ting";
  const logos = [
    { id: 1 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 2 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 3 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 4 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 5 , source: require('../assets/image/scansavvyTrans.png') },
    { id: 6 , source: require('../assets/image/scansavvyTrans.png') },
  ]

  // Function to render each row of logos
  const renderRow = ({ item }) => (
    <View style={styles.row}>
      {item.map(logo => (
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
  // if (user.userType === "user") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Your main content */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 36, fontWeight: '500', paddingHorizontal: 20, marginTop: 10}}>Welcome</Text>
          <Text style={{ fontSize: 30, paddingHorizontal: 20}}>{firstName}</Text>
          {/* Grey box in the middle */}
          <View style={ styles.greybox }>
            <View style={styles.headerContainer}>
              <Text style={styles.content}>Featured Websites</Text>
              <Text style={styles.viewallContent}>View All</Text>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Favourites")}
            >
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
  // } else if (user.userType == "admin") {
    // return (
    //   <Text>im admin!!!!!!!</Text>
    // );
  // }
}


const styles = StyleSheet.create({
    greybox: {
      backgroundColor: '#e8ecf4', 
      height: 300,
      marginTop: 20,
    },
    content: {
      fontSize: 20,
      paddingHorizontal: 20,
      marginTop: 20
    },
    container: {
      // flex: 3,
      justifyContent: 'center',
      // alignItems: 'left',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      padding: '5px',
      margin: '5px',
    },
    favrows: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      padding: '5px',
      margin: '5px',
    },
    logoContainer: {
      flex: 3,
      // margin: '10px 20px 10px',
      // justifyContent: 'center',
      // alignContent: 'center',
    },
    logo: {
      width: 130,
      height: 80,
      margin: '10px',
      resizeMode: 'contain',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 10,
    },
    viewallContent: {
      fontSize: 16,
      // paddingHorizontal: 20,
      marginTop: 20,
      color: '#FF914D',
    }
});
