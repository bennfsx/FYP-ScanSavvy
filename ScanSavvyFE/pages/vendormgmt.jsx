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
import axiosAPI from "../axsioAPI";

export default function VendorMgmt() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editVendor, setEditVendor] = useState(null);

  // Data for the vendor table
  const [data, setData] = useState({
    tableHead: ["ID", "Name", "Email", "Website", "Phone", "Status", "Actions"],
    tableData: [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        website: "www.example.com",
        phone: "123-456-7890",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        website: "www.example.com",
        phone: "123-456-7890",
        status: "Inactive",
      },
      // Add more data as needed
    ],
  });

  const handleAddVendor = () => {
    // Add new vendor logic
    console.log("Add Vendor clicked");
    setIsModalVisible(true);
  };

  const handleSaveVendor = () => {
    // Save new vendor logic
    console.log("Save Vendor clicked");
    setIsModalVisible(false);
    // Clear input fields
    setNewVendor({
      id: "",
      name: "",
      email: "",
      website: "",
      phone: "",
      status: "",
    });
  };

  const handleEdit = (id) => {
    // Find the vendor data by id
    const vendor = data.tableData.find((vendor) => vendor.id === id);
    // Set editVendor state to the found vendor data
    setEditVendor(vendor);
    // Set editId state to the id of the vendor being edited
    setEditId(id);
    // Show the edit modal
    setIsEditModalVisible(true);
  };

  const confirmEdit = () => {
    // Update the vendor data with the edited values
    setData({
      ...data,
      tableData: data.tableData.map((vendor) => {
        if (vendor.id === editId) {
          return editVendor; // Replace the vendor with the edited data
        }
        return vendor;
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
          <Text style={styles.title}>Vendors</Text>
          <View style={[styles.row, styles.header]}>
            {data.tableHead.map((header, index) => (
              <Text key={index} style={[styles.cell, styles.headerCell]}>
                {header}
              </Text>
            ))}
          </View>
          {data.tableData.map((rowData, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.cell}>{rowData.id}</Text>
              <Text style={styles.cell}>{rowData.name}</Text>
              <Text style={styles.cell}>{rowData.email}</Text>
              <Text style={styles.cell}>{rowData.website}</Text>
              <Text style={styles.cell}>{rowData.phone}</Text>
              <Text style={styles.cell}>{rowData.status}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleEdit(rowData.id)}
                  style={[styles.button, styles.editButton]}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(rowData.id)}
                  style={[styles.button, styles.deleteButton]}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      {/* Add Vendor Button */}
      <TouchableOpacity onPress={handleAddVendor} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Vendor</Text>
      </TouchableOpacity>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Vendor</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Website"
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, website: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, phone: text })
              }
            />
            <Button title="Save Vendor" onPress={handleSaveVendor} />
          </View>
        </View>
      </Modal>
      {/* Delete Vendor */}
      <Modal
        visible={isDeleteModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsDeleteModalVisible(false)}
      >
        <View style={styles.modalDelete}>
          <View style={styles.modalContentDelete}>
            <Text style={styles.modalTitleDelete}>Confirm Deletion</Text>
            <Text style={styles.modalTextDelete}>
              Are you sure you want to delete this vendor?
            </Text>
            <View style={styles.modalButtonsDelete}>
              <TouchableOpacity
                onPress={() => setIsDeleteModalVisible(false)}
                style={[styles.modalButtonDelete, styles.cancelButton]}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDelete}
                style={[styles.modalButtonDelete, styles.deleteButton]}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Edit Vendor */}
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        {/* Edit Vendor Modal Content */}
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Vendor</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editVendor ? editVendor.name : ""}
              onChangeText={(text) =>
                setEditVendor({ ...editVendor, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={editVendor ? editVendor.email : ""}
              onChangeText={(text) =>
                setEditVendor({ ...editVendor, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Website"
              value={editVendor ? editVendor.website : ""}
              onChangeText={(text) =>
                setEditVendor({ ...editVendor, website: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={editVendor ? editVendor.phone : ""}
              onChangeText={(text) =>
                setEditVendor({ ...editVendor, phone: text })
              }
            />
            <Button title="Save Vendor" onPress={confirmEdit} />
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
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
  },
  header: {
    backgroundColor: "darkblue",
  },
  cell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
  },
  actions: {
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
  editButton: {
    backgroundColor: "green",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  cancelButton: {
    backgroundColor: "gray",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1d1d1d",
  },
  addButton: {
    position: "absolute",
    top: 5,
    right: 20,
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 40,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginBottom: 10,
  },
  modalDelete: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContentDelete: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitleDelete: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalTextDelete: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtonsDelete: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButtonDelete: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
});
