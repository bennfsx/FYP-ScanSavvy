import React, { useState } from "react";
import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    CheckBox,
    Modal
} from "react-native"

export default function Favourites() {
    const [modalVisible, setModalVisible] = useState(false);

    const [data, setData] = useState([
        { id: 1, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
        { id: 2, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
        { id: 3, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
        { id: 4, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
        { id: 5, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
        { id: 6, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
        { id: 7, label: 'ScanSavvy', image: require('../assets/image/scansavvyTrans.png'), checked: false },
    ]); 
    const toggleCheckbox = (id) => {
        setData(
          data.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          )
        );
      };
    
      const renderItem = ({ item }) => (
        <View>
        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
          onPress={() => toggleCheckbox(item.id)}
        >
          <Image
            source={item.image}
            style={styles.image}
          />
          <Text style={{ flex: 1 }}>{item.label}</Text>
          <CheckBox
            value={item.checked}
            onValueChange={() => toggleCheckbox(item.id)}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        </View>
        
      );

    return (
        <SafeAreaView style={{ flex: 1, background: "#e8ecf4", paddingHorizontal: 20 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Edit Favourites</Text>
            </View>
            <Text style={styles.subtitle}>Select up to 3 shortcuts to access quickly on your homepage.</Text>
            <View style={{ padding: 20 }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                
            />
            {/* Save Button */}
                <TouchableOpacity style={styles.saveButton} onPress={() => setModalVisible(true)}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Updated Favourites Successfully!</Text>
                        <TouchableOpacity
                            style={styles.buttonConfirmation}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        marginTop: 10
    },
    subtitle: {
        fontSize: 14,
        fontWeight: 300,
        paddingHorizontal: 10,
        marginHorizontal: 12,
    },
    image: {
        width: 130, 
        height: 50, 
        marginRight: 10
    },
    line: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        width: "100%", // Adjust width as needed
        marginBottom: 8
    },
    saveButton: {
        // marginTop: 10,
        backgroundColor: "#000",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },
    buttonText: {
        // fontSize: 16,
        fontWeight: "500",
        color: "#fff",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonConfirmation: {
        marginTop: 10,
        backgroundColor: "#000",
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 80,
        alignItems: "center",
    }
});