import React, { useState, useEffect } from "react";
import {
    Text,
    SafeAreaView,
    StyleSheet,
    ImageBackground,
} from "react-native";
import axios from "axios"; // Import axios for making HTTP requests

export default function SuccessMsg() {
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

    return (
        <SafeAreaView style={{ flex: 1, padding: 2, marginTop: 10 }}>
            <ImageBackground
                source={require('../assets/correct.png')} 
                style={styles.imageBackground}
                >
            </ImageBackground>
            <Text style={styles.text}>You have been verified for {eventName}</Text>
            <Text style={styles.subtitle}>{eventDateTime}</Text>
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
    }
  });