import React, { useState } from "react";
import { 
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    View,
} from "react-native";


export default function editProfile() {
    const [firstName, setfirstName] = useState("Johnny Lim")
    const [lastName, setlastName] = useState("Limmy")
    const [email, setemail] = useState("JohnnyLim@gmail.com")
    const [mobile, setmobile] = useState("98765432")

    return (
        <SafeAreaView style={{ flex: 1, background: "#e8ecf4", paddingHorizontal: 20 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
            </View>
            
            {/* First Name Field  */}
            <View style={styles.input}> 
                <Text style={styles.header}>First Name</Text>
                <View style={styles.box}>  
                    <TextInput
                        value={firstName}
                        onChangeText={value=>setfirstName(value)}
                        editable={true}
                    /> 
                </View>
            </View> 
            {/* Last Name Field  */}
            <View style={styles.input}> 
                <Text style={styles.header}>Last Name</Text>
                <View style={styles.box}>  
                    <TextInput
                        value={lastName}
                        onChangeText={value=>setlastName(value)}
                        editable={true}
                    /> 
                </View>
            </View>
            {/* Email Address Field  */}
            <View style={styles.input}> 
                <Text style={styles.header}>Email Address</Text>
                <View style={styles.box}>  
                    <TextInput
                        value={email}
                        onChangeText={value=>setemail(value)}
                        editable={true}
                    /> 
                </View>
            </View> 
            {/* Mobile Phone Field  */}
            <View style={styles.input}> 
                <Text style={styles.header}>Mobile Phone</Text>
                <View style={styles.box}>  
                    <TextInput
                        value={mobile}
                        onChangeText={value=>setmobile(value)}
                        editable={true}
                    /> 
                </View>
            </View>

            <View style={styles.container}>
                <Text style={styles.title}>Delete Account{'\n'}</Text>
                <Text style={styles.subtitle}>Your account will be permanently removed 
from the application. All data will be lost.</Text>
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
        paddingHorizontal: 20,
      },
      header: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1d1d1d",
        marginBottom: 12,
        paddingHorizontal: 20,
      },
      subtitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#929292",
        textAlign: "center",
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
        addingLeft: 8,
        paddingHorizontal: 20,
        borderColor: '#fff'
      },

});