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
import { Avatar, Divider, Icon, Overlay } from "react-native-elements";

import AsyncStorage from "@react-native-community/async-storage";
import { FlatList } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const arrMenu = [
  { id: 0, name: "Home", icon: "home-outline", navScreen: "HomeScreen" },
  {
    id: 1,
    name: "Favourite",
    icon: "heart-multiple-outline",
    navScreen: "FavouriteScreen",
  },
  {
    id: 2,
    name: "Messages",
    icon: "comment-text-multiple",
    navScreen: "MessagesScreen",
  },
  { id: 3, name: "My Walet", icon: "wallet", navScreen: "MyWaletScreen" },
  { id: 4, name: "Help", icon: "help", navScreen: "HelpScreen" },
  { id: 5, name: "Log out", icon: "logout", navScreen: "LoginScreen" },
];

const CustomSidebarMenu = (props) => {
  // const CustomSidebarMenu = (props) => {

  console.log("CustomSidebarMenuash ", props);
  console.log("CustomSidebarMenuash44 ", props.state.routes);

  const ripple = TouchableNativeFeedback.Ripple("#adacac", false);

  const navigateToScreen = (navScreen) => {
    props.navigation.toggleDrawer();
    props.navigation.replace(navScreen);
    // this.props.navigation.navigate(navScreen)
  };

  // const [username,setUserName]=useState("ashish")
  // const [profileImage,setProfileImage]=useState("")

  // Similar to componentDidMount and componentDidUpdate:
  // useEffect(() => {
  //   // Update the document title using the browser API
  //   readData();
  // },[]);

  // const readData = async () => {
  //   try {
  //      const userData = await AsyncStorage.getItem('@user_data');
  //      console.log("userData",userData);
  //    // const token = await AsyncStorage.getItem("auth_token");

  //     // const mData = JSON.parse(userData);

  //     // if (token) {
  //     //   setAuthToken(token);
  //     // }
  //     if (token) {
  //       this.setState({
  //         // userId: mData.id,
  //         // userType: mData.userType,
  //         authToken: token,
  //       });

  //     }
  //   } catch (e) {
  //     console.log("catch ", e);
  //     alert("Failed to fetch the data from storage" + e);
  //   }
  // };
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
          <Text style={stylesSidebar.profileHeaderText}>UserName: ashish</Text>
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
                source={require("../../Image/menu_logo.png")}
              />
              <Text style={{ color: "black" }}>Logout</Text>
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

      {/* <View elevation={6} style={{ backgroundColor: '#ffffff' }}>
          <TouchableNativeFeedback onPress={()=> navigateToScreen("Profile")} background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='logout'
                type='simple-line-icon'
                size={20}
                color={'grey'}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Logout</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={()=> props.navigation.toggleDrawer()} background={ripple}>
            <View style={styles.containDrawerOption}>
              <Icon
                name='user-secret'
                type='font-awesome'
                size={24}
                color={'grey'}
                containerStyle={{ marginRight: '10%' }}
              />
              <Text style={{ color: 'black', fontFamily: 'sans-serif-medium' }}>Developer</Text>
            </View>
          </TouchableNativeFeedback>

        </View> */}
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
