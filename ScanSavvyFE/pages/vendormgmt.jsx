import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  DataTable,
  FAB,
  Portal,
  Provider,
  Text,
  TouchableRipple,
} from "react-native-paper";
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

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosAPI.post("/admin/getvendor");
        setData(
          response.data.map((vendor) => ({
            siteID: vendor.siteID,
            siteName: vendor.siteName || "",
            siteURL: vendor.siteURL || "",
            email: vendor.email || "",
            phone: vendor.phone || "",
        }))
      );
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);
  

  const handleAddVendor = () => {
    setIsModalVisible(true);
  };

  const handleSaveVendor = async () => {
    try {
      await axiosAPI.put("/admin/createvendor", newVendor);
      setIsModalVisible(false);
      setNewVendor({
        siteName: "",
        siteURL: "",
        email: "",
        phone: "",
      });
      const response = await axiosAPI.post("/admin/getvendor");
        setData(
          response.data.map((vendor) => ({
            siteID: vendor.siteID,
            siteName: vendor.siteName || "",
            siteURL: vendor.siteURL || "",
            email: vendor.email || "",
            phone: vendor.phone || "",
          }))
        );
    } catch (error) {
      console.error("Error saving vendor:", error);
    }
  };

  const handleEdit = (id) => {
    const vendor = data.find((vendor) => vendor.siteID === id);
    setEditVendor(vendor);
    setEditId(id);
    setIsEditModalVisible(true);
  };

  const confirmEdit = async () => {
    try {
      await axiosAPI.patch(`/admin/updatevendorbyid/${editId}`, editVendor);
      setIsEditModalVisible(false);
      const response = await axiosAPI.post("/admin/getvendor");
        setData(
          response.data.map((vendor) => ({
            siteID: vendor.siteID,
            siteName: vendor.siteName || "",
            siteURL: vendor.siteURL || "",
            email: vendor.email || "",
            phone: vendor.phone || "",
          }))
        );
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
      setIsDeleteModalVisible(false);
      const response = await axiosAPI.post("/admin/getvendor");
        setData(
          response.data.map((vendor) => ({
            siteID: vendor.siteID,
            siteName: vendor.siteName || "",
            siteURL: vendor.siteURL || "",
            email: vendor.email || "",
            phone: vendor.phone || "",
          }))
        );
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex:1, background: "#e8ecf4", padding: 20 }}>
            <Text style={styles.title}>Vendors</Text>
            <ScrollView horizontal={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Name</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>Website</DataTable.Title>
                <DataTable.Title>Mobile</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
              </DataTable.Header>

            {data.map((vendor, index) => (
              <DataTable.Row key={index}>
                <DataTable.Cell>{vendor.siteID}</DataTable.Cell>
                <DataTable.Cell>{vendor.siteName}</DataTable.Cell>
                <DataTable.Cell>{vendor.email}</DataTable.Cell>
                <DataTable.Cell>{vendor.siteURL}</DataTable.Cell>
                <DataTable.Cell>{vendor.phone}</DataTable.Cell>
                <DataTable.Cell>
                    <View style={styles.actionsContainer}>
                      <TouchableRipple
                        onPress={() => handleEdit(vendor.siteID)}
                        style={styles.editButton}
                        >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableRipple>
                      <TouchableRipple
                        onPress={() => handleDelete(vendor.siteID)}
                        style={styles.deleteButton}
                        >
                        <Text style={styles.buttonText}>Delete</Text>
                      </TouchableRipple>
                    </View>
                  </DataTable.Cell>
              </DataTable.Row>
            ))}
            </DataTable>
          </ScrollView>
        <FAB
            style={styles.fab}
            small
            icon="plus"
            onPress={handleAddVendor}
            label="Add Vendor"
          />
        {/* Add Vendor Modal */}
        <Portal>
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <TouchableWithoutFeedback 
              onPress={() => setIsModalVisible(false)}
            >
            <View style={styles.modal}>
              <TouchableWithoutFeedback>
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
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Delete User Modal */}
        <Modal
          visible={isDeleteModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsDeleteModalVisible(false)}
        >
          <TouchableWithoutFeedback
            onPress={() => setIsDeleteModalVisible(false)}
          >
          <View style={styles.modalDelete}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContentDelete}>
                <Text style={styles.modalTitleDelete}>Confirm Deletion</Text>
                <Text style={styles.modalTextDelete}>
                  Are you sure you want to delete this vendor?
                </Text>
                <View style={styles.modalButtonsDelete}>
                    <TouchableRipple
                      onPress={() => setIsDeleteModalVisible(false)}
                      style={[styles.modalButtonDelete, styles.cancelButton]}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableRipple>
                    <TouchableRipple
                      onPress={confirmDelete}
                      style={[styles.modalButtonDelete, styles.deleteButton]}
                    >
                      <Text style={styles.buttonText}>Delete</Text>
                    </TouchableRipple>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        {/* Edit Vendor Modal */}
        <Modal
          visible={isEditModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setIsEditModalVisible(false)}
        >
          <TouchableWithoutFeedback 
            onPress={() => setIsEditModalVisible(false)}
          >
          <View style={styles.modal}>
            <TouchableWithoutFeedback>
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
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
        </Portal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    padding: 30,
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
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    width: 100,
    flexWrap: 'wrap',  
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginVertical: 10,
    marginHorizontal: 10,
    width: 100,
  },
  actionsContainer: {
    flexDirection: "row",
    width: 400,
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
    fontSize: 14,
  },
  editButton: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: "green",
    marginRight: 5,
  },
  deleteButton: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: "red",
    marginRight: 5,
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
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#FF914D",
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
