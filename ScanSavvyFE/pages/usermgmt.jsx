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
import axiosAPI from "../axsioAPI"; // Ensure this path is correct

export default function UserMgmt() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosAPI.get("/user/getuser");
        setData(
          response.data.map((user) => ({
            userID: user.userID,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            mobile: user.mobile || "",
            userType: user.userType || "",
          }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddUser = () => {
    setIsModalVisible(true);
  };

  const handleSaveUser = async () => {
    try {
      await axiosAPI.put("/auth/signup", newUser); // Adjust the endpoint as necessary
      setIsModalVisible(false);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
      });
      const response = await axiosAPI.get("/user/getuser");
      setData(
        response.data.map((user) => ({
          userID: user.userID,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          mobile: user.mobile || "",
          userType: user.userType || "",
        }))
      );
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleEdit = (id) => {
    const user = data.find((user) => user.userID === id);
    setEditUser(user);
    setEditId(id);
    setIsEditModalVisible(true);
  };

  const confirmEdit = async () => {
    try {
      await axiosAPI.patch(`/user/updateuserbyid/${editId}`, editUser); // Adjust the endpoint as necessary
      setIsEditModalVisible(false);
      const response = await axiosAPI.get("/user/getuser");
      setData(
        response.data.map((user) => ({
          userID: user.userID,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          mobile: user.mobile || "",
          userType: user.userType || "",
        }))
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axiosAPI.delete(`/user/deletebyuserid/${deleteId}`); // Adjust the endpoint as necessary
      setIsDeleteModalVisible(false);
      const response = await axiosAPI.get("/user/getuser");
      setData(
        response.data.map((user) => ({
          userID: user.userID,
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          mobile: user.mobile || "",
          userType: user.userType || "",
        }))
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Provider>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: "#e8ecf4", padding: 20 }}
        >
          <Text style={styles.title}>Users</Text>
          <ScrollView horizontal={true}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>First Name</DataTable.Title>
                <DataTable.Title>Last Name</DataTable.Title>
                <DataTable.Title>Email</DataTable.Title>
                <DataTable.Title>Mobile</DataTable.Title>
                <DataTable.Title>User Type</DataTable.Title>
                <DataTable.Title>Actions</DataTable.Title>
              </DataTable.Header>

              {data.map((user, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell>{user.userID}</DataTable.Cell>
                  <DataTable.Cell>{user.firstName}</DataTable.Cell>
                  <DataTable.Cell>{user.lastName}</DataTable.Cell>
                  <DataTable.Cell>{user.email}</DataTable.Cell>
                  <DataTable.Cell>{user.mobile}</DataTable.Cell>
                  <DataTable.Cell>{user.userType}</DataTable.Cell>
                  <DataTable.Cell>
                    <View style={styles.actionsContainer}>
                      <TouchableRipple
                        onPress={() => handleEdit(user.userID)}
                        style={styles.editButton}
                      >
                        <Text style={styles.buttonText}>Edit</Text>
                      </TouchableRipple>
                      <TouchableRipple
                        onPress={() => handleDelete(user.userID)}
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
            onPress={handleAddUser}
            label="Add User"
          />

          {/* Add User Modal */}
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
                      <Text style={styles.modalTitle}>Add User</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={newUser.firstName}
                        onChangeText={(text) =>
                          setNewUser({ ...newUser, firstName: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={newUser.lastName}
                        onChangeText={(text) =>
                          setNewUser({ ...newUser, lastName: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={newUser.email}
                        onChangeText={(text) =>
                          setNewUser({ ...newUser, email: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Mobile"
                        value={newUser.mobile}
                        onChangeText={(text) =>
                          setNewUser({
                            ...newUser,
                            mobile: text,
                          })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry={true}
                        value={newUser.password}
                        onChangeText={(text) =>
                          setNewUser({ ...newUser, password: text })
                        }
                      />
                      <Button title="Save User" onPress={handleSaveUser} />
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
                <View style={styles.modal}>
                  <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>Confirm Deletion</Text>
                      <Text style={styles.modalTextDelete}>
                        Are you sure you want to delete this user?
                      </Text>
                      <View style={styles.modalButtonsDelete}>
                        <TouchableRipple
                          onPress={() => setIsDeleteModalVisible(false)}
                          style={[
                            styles.modalButtonDelete,
                            styles.cancelButton,
                          ]}
                        >
                          <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableRipple>
                        <TouchableRipple
                          onPress={confirmDelete}
                          style={[
                            styles.modalButtonDelete,
                            styles.deleteButton,
                          ]}
                        >
                          <Text style={styles.buttonText}>Delete</Text>
                        </TouchableRipple>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>

            {/* Edit User Modal */}
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
                      <Text style={styles.modalTitle}>Edit User</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={editUser?.firstName}
                        onChangeText={(text) =>
                          setEditUser({ ...editUser, firstName: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={editUser?.lastName}
                        onChangeText={(text) =>
                          setEditUser({ ...editUser, lastName: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={editUser?.email}
                        onChangeText={(text) =>
                          setEditUser({ ...editUser, email: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Mobile"
                        value={editUser?.mobile}
                        onChangeText={(text) =>
                          setEditUser({ ...editUser, mobile: text })
                        }
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="User Type"
                        value={editUser?.userType}
                        onChangeText={(text) =>
                          setEditUser({ ...editUser, userType: text })
                        }
                      />
                      <Button title="Save User" onPress={confirmEdit} />
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
    width: 300,
  },
  button: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF914D",
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
