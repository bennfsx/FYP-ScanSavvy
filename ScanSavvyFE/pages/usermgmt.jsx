import React, { useState } from "react";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
} from "react-native";

export default function UserMgmt() {
    const [isModalVisible, setIsModalVisible] = useState(false); 
    const [isEditModalVisible, setIsEditModalVisible] = useState(false); 
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); 
    const [editId, setEditId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [editUser, setEditUser] = useState(null);

    // Data for the user table
    const [data, setData] = useState({
        tableHead: ['ID', 'Name', 'LastName','Email', 'Phone', 'Status', 'Actions'],
        tableData: [
        { id: 1, name: 'John Doe', lastname: 'Doe', email: 'john@example.com', phone: '123-456-7890', status: 'Active' },
        { id: 2, name: 'Jane Smith', lastname: 'Smith', email: 'jane@example.com', phone: '123-456-7890', status: 'Inactive' },
          // Add more data as needed
    ]});

    const handleAddUser = () => {
        // Add new user logic
        console.log('Add User clicked');
        setIsModalVisible(true);
    };

    const handleSaveUser = () => {
        // Save new user logic
        console.log('Save User clicked');
        setIsModalVisible(false);
        // Clear input fields
        setNewUser({
            id: '',
            name: '',
            lastname: '',
            email: '',
            phone: '',
            status: '',
        });
    };

    const handleEdit = (id) => {
        // Find the user data by id
        const user = data.tableData.find((user) => user.id === id);
        // Set editUser state to the found user data
        setEditUser(user);
        // Set editId state to the id of the user being edited
        setEditId(id);
        // Show the edit modal
        setIsEditModalVisible(true);
    };


    const confirmEdit = () => {
        // Update the user data with the edited values
        setData({
            ...data,
            tableData: data.tableData.map((user) => {
                if (user.id === editId) {
                    return editUser; // Replace the user with the edited data
                }
                return user;
            }),
        });
        // Hide the edit modal
        setIsEditModalVisible(false);
    };


    const handleDelete = (id) => {
        // Handle delete action here
        console.log(`Delete action clicked for ID: ${id}`);
        setDeleteId(id);
        setIsDeleteModalVisible(true);
    };
    
    const confirmDelete = () => {
        // Logic to delete the item with deleteId
        console.log(`Deleting item with ID: ${deleteId}`);
        setIsDeleteModalVisible(false);
    };

    return (
        <SafeAreaView style={{ background: "#e8ecf4", paddingHorizontal: 20 }}>
            {/* Data Table */}
            <ScrollView horizontal={true}>
            <View style={styles.container}>
                <Text style={styles.title}>Users</Text>
                <View style={[styles.row, styles.header]}>
                    {data.tableHead.map((header, index) => (
                        <Text key={index} style={[styles.cell, styles.headerCell]}>{header}</Text>
                    ))}
                </View>
                {data.tableData.map((rowData, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={styles.cell}>{rowData.id}</Text>
                        <Text style={styles.cell}>{rowData.name}</Text>
                        <Text style={styles.cell}>{rowData.lastname}</Text>
                        <Text style={styles.cell}>{rowData.email}</Text>
                        <Text style={styles.cell}>{rowData.phone}</Text>
                        <Text style={styles.cell}>{rowData.status}</Text>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => handleEdit(rowData.id)} style={[styles.button, styles.editButton]}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleDelete(rowData.id)} style={[styles.button, styles.deleteButton]}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </View>
            </ScrollView>
            {/* Add User Button */}
            <TouchableOpacity onPress={handleAddUser} style={styles.addButton}>
                <Text style={styles.addButtonText}>Add User</Text>
            </TouchableOpacity>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Add User</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            onChangeText={(text) => setNewUser({ ...newUser, name: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name"
                            onChangeText={(text) => setNewUser({ ...newUser, lastname: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            onChangeText={(text) => setNewUser({ ...newUser, phone: text })}
                        />
                        <Button title="Save" onPress={handleSaveUser} />
                    </View>
                </View>
            </Modal>
            {/* Delete User */}
            <Modal
                visible={isDeleteModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsDeleteModalVisible(false)}
            >
                <View style={styles.modalDelete}>
                <View style={styles.modalContentDelete}>
                    <Text style={styles.modalTitleDelete}>Confirm Deletion</Text>
                    <Text style={styles.modalTextDelete}>Are you sure you want to delete this user?</Text>
                    <View style={styles.modalButtonsDelete}>
                    <TouchableOpacity onPress={() => setIsDeleteModalVisible(false)} style={[styles.modalButtonDelete, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={confirmDelete} style={[styles.modalButtonDelete, styles.deleteButton]}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </View>
            </Modal>
            {/* Edit User */}
            <Modal
                visible={isEditModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsEditModalVisible(false)}
            >
            {/* Edit User Modal Content */}
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Edit User</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={editUser ? editUser.name : ''}
                        onChangeText={(text) => setEditUser({ ...editUser, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="LastName"
                        value={editUser ? editUser.lastname : ''}
                        onChangeText={(text) => setEditUser({ ...editUser, lastname: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={editUser ? editUser.email : ''}
                        onChangeText={(text) => setEditUser({ ...editUser, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        value={editUser ? editUser.phone : ''}
                        onChangeText={(text) => setEditUser({ ...editUser, phone: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Status"
                        value={editUser ? editUser.status : ''}
                        onChangeText={(text) => setEditUser({ ...editUser, status: text })}
                    />
                    <Button title="Save" onPress={confirmEdit} />
                </View>
            </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    header: {
        backgroundColor: 'darkblue',
    },
    cell: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        textAlign: 'center',
    },
    headerCell: {
        fontWeight: 'bold',
        color: '#fff',
    },
    actions: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
    editButton: {
        backgroundColor: 'green',
    },
    deleteButton: {
        backgroundColor: 'red',
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#1d1d1d",
    },
    addButton: {
        position: 'absolute',
        top: 5,
        right: 20,
        backgroundColor: 'blue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    addButtonText: {
        color: '#fff',
    },
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginBottom: 10,
    },
    modalDelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentDelete: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitleDelete: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTextDelete: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtonsDelete: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalButtonDelete: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
});
