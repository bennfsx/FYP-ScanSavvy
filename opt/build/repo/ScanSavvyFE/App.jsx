import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login";
import Home from "./pages/Home";
import QRscanner from "./partials/QRscanner";
import Register from "./pages/register";
import Account from "./pages/account";
import { UserProvider } from "./context/UserContext";
import EditProfile from "./pages/editProfile";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      {" "}
      {/* Wrap your entire component hierarchy with UserProvider */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="QRscanner" component={QRscanner} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
