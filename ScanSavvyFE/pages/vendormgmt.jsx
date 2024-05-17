import React, { useState, useEffect } from "react";
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
  const [newVendor, setNewVendor] = useState({
    siteName: "",
    siteURL: "",
    email: "",
    phone: "",
  });

  // Data for the vendor table
  const [data, setData] = useState({
    tableHead: ["ID", "Name", "Email", "Website", "Phone", "Status", "Actions"],
    tableData: [],
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axiosAPI.post("/admin/getvendor");
      setData((prevData) => ({
        ...prevData,
        tableData: response.data,
      }));
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleAddVendor = () => {
    setIsModalVisible(true);
  };

  const handleSaveVendor = async () => {
    try {
      await axiosAPI.put("/admin/createvendor", newVendor);
      fetchVendors();
      setIsModalVisible(false);
      setNewVendor({
        siteName: "",
        siteURL: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("Error saving vendor:", error);
    }
  };

  const handleEdit = (id) => {
    const vendor = data.tableData.find((vendor) => vendor.siteID === id);
    setEditVendor(vendor);
    setEditId(id);
    setIsEditModalVisible(true);
  };

  const confirmEdit = async () => {
    try {
      await axiosAPI.patch(`/admin/updatevendorbyid/${editId}`, editVendor);
      fetchVendors();
      setIsEditModalVisible(false);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosAPI.delete(`/admin/deletevendorbyid/${deleteId}`);
      fetchVendors();
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <SafeAreaView style={{ background: "#e8ecf4", paddingHorizontal: 20 }}>
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
              <Text style={styles.cell}>{rowData.siteID}</Text>
              <Text style={styles.cell}>{rowData.siteName}</Text>
              <Text style={styles.cell}>{rowData.email}</Text>
              <Text style={styles.cell}>{rowData.siteURL}</Text>
              <Text style={styles.cell}>{rowData.phone}</Text>
              <Text style={styles.cell}>{rowData.status}</Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => handleEdit(rowData.siteID)}
                  style={[styles.button, styles.editButton]}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(rowData.siteID)}
                  style={[styles.button, styles.deleteButton]}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
              value={newVendor.siteName}
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, siteName: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newVendor.email}
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, email: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Website"
              value={newVendor.siteURL}
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, siteURL: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={newVendor.phone}
              onChangeText={(text) =>
                setNewVendor({ ...newVendor, phone: text })
              }
            />
            <Button title="Save Vendor" onPress={handleSaveVendor} />
          </View>
        </View>
      </Modal>
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
      <Modal
        visible={isEditModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Vendor</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={editVendor ? editVendor.siteName : ""}
              onChangeText={(text) =>
                setEditVendor({ ...editVendor, siteName: text })
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
              value={editVendor ? editVendor.siteURL : ""}
              onChangeText={(text) =>
                setEditVendor({ ...editVendor, siteURL: text })
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
