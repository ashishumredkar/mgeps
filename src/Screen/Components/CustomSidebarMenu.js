// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
  ImageBackground,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  SafeAreaView,
} from "@react-navigation/drawer";
import {Divider } from "react-native-elements";

import AsyncStorage from "@react-native-community/async-storage";

const CustomSidebarMenu = (props) => {
  // const CustomSidebarMenu = (props) => {
    // const [name, setName] = useState('John Doe');

    console.log("CustomSidebarMenu ",props.employeename)

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../Image/website_image_fit.png")}
      />
      <View Style={{ flexDirection: "row" }}>
        <View style={stylesSidebar.profileHeader}>
          {/* <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#307ecc'}}>
            {'About React'.charAt(0)}
          </Text>
        </View> */}
          <Image
            source={{ uri: "http://loremflickr.com/g/50/50/paris" }}
            style={{ width: 40, height: 40, borderRadius: 40 / 2 }}
          />
          <Text style={stylesSidebar.profileHeaderText}>mgeps</Text>
          <Text style={stylesSidebar.profileHeaderText}>UserName:{props.employeename}</Text>
        </View>
      </View>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView
        {...props}
        style={{ backgroundColor: "white", color: "black" }}
      >
        {/* { renderLogoutConfirmationModal } */}

        <DrawerItemList {...props} labelStyle={{ color: "black" }} />

        <View>
          <View style={{ marginTop: "2%" }}>
            <Divider style={{ backgroundColor: "#777f7c90" }} />
          </View>

          {/* <View style={{ marginTop: '5%' }}>
            <Divider style={{ backgroundColor: '#777f7c90' }} />
         </View> */}
        </View>
        <DrawerItem
          label={({ color }) => (
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ width: 35, height: 35, backgroundColor: "white" }}
                source={require("../../Image/logout.png")}
              />
              <Text style={{ color: "black",marginTop:5 }}>Logout</Text>
            </View>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              "Logout",
              "Are you sure? You want to logout?",
              [
                {
                  text: "Cancel",
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: "Confirm",
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace("Auth");
                  },
                },
              ],
              { cancelable: false }
            );
          }}
        />
      </DrawerContentScrollView>

      
    </View>
  );
};

export default CustomSidebarMenu;

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  containHeader: {
    paddingTop: "4%",
    paddingBottom: "4%",
  },
  containDrawerOption: {
    paddingLeft: "6%",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: "1%",
    paddingBottom: "5%",
    backgroundColor: "#e6e6e6",
  },
  headerText: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 50,
  },
  actionText: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
    marginRight: "3%",
    marginLeft: "3%",
  },
  closeBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 17,
  },
  closeText: {
    fontFamily: "sans-serif-medium",
    fontWeight: "600",
    marginRight: "3%",
    marginLeft: "3%",
  },
});

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#307ecc",
    paddingTop: 40,
    color: "white",
  },
  profileHeader: {
    paddingTop: 40,
    flexDirection: "column",
    // backgroundColor: '#307ecc',
    padding: 15,
    //textAlign: 'star',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});
