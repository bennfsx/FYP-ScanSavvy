import React, { useState, useEffect } from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigation } from "@react-navigation/native";

export default function SuccessMsg() {
    const navigation = useNavigation();

    const [eventName, setEventName] = useState("");
    const [eventDateTime, setEventDateTime] = useState("");

    useEffect(() => {
        // Fetch event details from the database
        const fetchEventDetails = async () => {
            try {
                // Make an HTTP GET request to retrieve event details
                const response = await axios.get("your_api_endpoint_here");

                // Update state variables with the retrieved values
                setEventName(response.data.eventName);
                setEventDateTime(response.data.eventDateTime);
            } catch (error) {
                console.error("Error fetching event details:", error);
            }
        };

        fetchEventDetails(); // Call the function to fetch event details
    }, []); // Empty dependency array ensures the effect runs only once

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 2, marginTop: 10 }}>
            <ImageBackground
                source={require('../assets/correct.png')} 
                style={styles.imageBackground}
                >
            </ImageBackground>
            <Text style={styles.text}>You have been verified for {eventName}</Text>
            <Text style={styles.subtitle}>{eventDateTime}</Text>
            <TouchableOpacity onPress={handleBackToHome} style={styles.button}>
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
      width: 200,
      height: 200,
      marginRight: 5, 
      alignSelf: 'center', 
      marginTop: 200,
    },
    text: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center', 
        marginVertical: 10, 
    },
    subtitle: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center', 
        marginVertical: 10
    },
    button: {
        backgroundColor: '#FF914D',
        padding: 20,
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
        paddingHorizontal: 60
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
    },
  });