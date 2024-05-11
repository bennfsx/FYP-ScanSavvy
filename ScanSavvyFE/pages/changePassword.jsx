import React, { useState } from "react";
import { 
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";

export default function changePassword() {
    const [password, setPassword] = useState("*******")

    return (
        <SafeAreaView style={{ flex: 1, background: "#e8ecf4", paddingHorizontal: 20 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Account</Text>
            </View>
            
            {/* Password Field  */}
            <View style={styles.input}> 
                <Text style={styles.header}>Change Password</Text>
                <View style={styles.box}>  
                    <TextInput
                        value={password}
                        onChangeText={value=>setPassword(value)}
                        editable={true}
                    /> 
                </View>
            </View> 

            {/* Confirm Password Field  */}
            <View style={styles.input}> 
                <Text style={styles.header}>Confirm Password</Text>
                <View style={styles.box}>  
                    <TextInput
                        value={password}
                        onChangeText={value=>setPassword(value)}
                        editable={true}
                    /> 
                </View>
            </View> 

            {/* Save Button */}
            <View style={styles.input}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        flexDirection: "row",
        // justifyContent: "center"
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
        addingLeft: 20,
        paddingHorizontal: 20,
        borderColor: '#fff'
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
});