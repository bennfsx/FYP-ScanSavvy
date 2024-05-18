import { React, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login";
import Home from "./pages/Home";
import QRscanner from "./partials/QRscanner";
import Register from "./pages/Register";
import Account from "./pages/Account";
import { useUser } from "./hooks/useUser";
import { UserProvider } from "./context/UserContext";
import EditProfile from "./pages/EditProfile";
import ChangePassword from "./pages/ChangePassword";
import Favourites from "./pages/Favourites";
import FeaturedWebs from "./pages/FeaturedWebs";
import VendorMgmt from "./pages/VendorMgmt";
import UserMgmt from "./pages/UserMgmt";
import SuccessMsg from "./pages/SuccessMsg";

const Stack = createStackNavigator();

function App() {
  const { user, checkSession } = useUser(); // Provide a default value for user

  useEffect(() => {
    checkSession();
  }, []);
  if (user.userType === "user") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="QRscanner" component={QRscanner} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="FeaturedWebs" component={FeaturedWebs} />
          <Stack.Screen name="SuccessMsg" component={SuccessMsg} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else if (user.userType == "admin") {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="QRscanner" component={QRscanner} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="VendorMgmt" component={VendorMgmt} />
          <Stack.Screen name="UserMgmt" component={UserMgmt} />
          {/* Add more screens here */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

function AppWithProvider() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}
export default AppWithProvider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
