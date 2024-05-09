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


    return (
        <SafeAreaView style={{ flex: 1, background: "#e8ecf4" }}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Profile</Text>
            </View>
            
            {/* First Name Field  */}
            <View style={styles.input}> 
                <Text style={styles.title}>Name</Text>
                    <View style={styles.box}>  
                    <TextInput
                        value={firstName}
                        onChangeText={value=>setfirstName(value)}
                        editable={true}
                    /> 
                    </View>
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
        fontSize: 15,
        fontWeight: "700",
        color: "#1d1d1d",
        marginBottom: 6,
        paddingHorizontal: 20,
      },
    //   input: {
    //     marginBottom: 16,
    //   },
      box: {
        height: 44,
        // backgroundColor: "#fff",
        borderWidth: 1,
        borderRadius: 4,
        marginVertical: 6,
        justifyContent: "center",
        // paddingLeft: 8,
        borderColor: "#222",
        paddingHorizontal: 20,
      },

});