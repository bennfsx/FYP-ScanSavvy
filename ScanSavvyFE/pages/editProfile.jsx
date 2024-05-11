import React, { useState } from "react";
import { 
    SafeAreaView,
    Text,
    TextInput,
    StyleSheet,
    View,
    TouchableOpacity,
    Modal,
} from "react-native";

export default function editProfile() {
    const [firstName, setfirstName] = useState("Johnny Lim")
    const [lastName, setlastName] = useState("Limmy")
    const [email, setemail] = useState("JohnnyLim@gmail.com")
    const [mobile, setmobile] = useState("98765432")

    const [modalVisible, setModalVisible] = useState(false);


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

            {/* Delete Account Section */}
            <View style={styles.input}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.deleteButton}>
                    <Text style={styles.buttonText}>Delete Account</Text>
                </TouchableOpacity>
                <Text style={styles.subtitle}>
                    Your account will be permanently removed from the application. All data will be lost.
                </Text>
            </View>
            {/* Save Button */}
            <View style={styles.input}>
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            {/* Delete Account Modal Pop Up */}
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Are you sure you want to delete this account?</Text>
                                <Text style={styles.modalSubtitles}>This will delete this account permanently. You cannot undo this action.</Text>
                                <TouchableOpacity style={styles.deleteButtonConfirmation}>
                                    <Text style={{ color: '#fff', fontWeight: '500' }}>Yes, I'm sure</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.cancelButton}>
                                    <Text style={{ color:'#000', paddingHorizontal: 20 }}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 12,
        flexDirection: "row",
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
    deleteButton: {
        marginTop: 20,
        backgroundColor: "#C42D3D",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },
    deleteButtonConfirmation: {
        marginTop: 10,
        backgroundColor: "#C42D3D",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 100,
        alignItems: "center",
    },
    cancelButton: {
        marginTop: 10,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: "#000",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 100,
        alignItems: "center",
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
    subtitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#929292",
        textAlign: "center",
        marginTop: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontWeight: "800",
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
    modalSubtitles: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
