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
  Linking,
} from "react-native";

import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  SafeAreaView,
} from "@react-navigation/drawer";
import { Divider } from "react-native-elements";

import AsyncStorage from "@react-native-community/async-storage";
import { AppColors } from "../../style/AppColors";
import { FAQ_URL } from "../Utils";

const CustomSidebarMenu = (props) => {

  const { state, ...rest } = props;
    const newState = { ...state };

    if(props.userType ==='Agency'){
      newState.routes = newState.routes.filter(
      
        (item) => item.name !== 'bidEventStack' ,
      );
  
    }
    
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <ImageBackground
        style={styles.bgImage}
        source={require("../../Image/material_bg_1.png")}
      />
      <View Style={{ flexDirection: "row" }}>
        <View style={stylesSidebar.profileHeader}>
          <Image
            source={require("../../Image/logo_192.png")}
            style={{
              width: 60,
              height: 60,
              borderRadius: 60 / 2,
              marginTop: -40,
              marginBottom: 30,
              backgroundColor: AppColors.AppGrey001,
            }}
          />
          <Text style={stylesSidebar.profileHeaderText}>MGEPS</Text>
          <Text style={stylesSidebar.profileHeaderText}>
            Username: {props.employeename}
          </Text>
        </View>
      </View>

      <View style={stylesSidebar.profileHeaderLine} />

      <DrawerContentScrollView
        state={newState} {...rest}
        style={{ backgroundColor: "white", color: "black" }}
      >
        {/* { renderLogoutConfirmationModal } */}

        <DrawerItemList state={newState} {...rest} labelStyle={{ color: "black" }} />

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
            <View style={{ flexDirection: "row", height:40, marginTop:-5  }}>
              <Image
                style={{ width: 35, height: 35, backgroundColor: "white" }}
                source={require("../../Image/faq2.png")}
              />
              <Text style={{ color: "black", marginTop: 5, marginLeft:5, fontWeight: "bold"}}>FAQ</Text>
            </View>
          )}
          onPress={() => {
            props.navigation.toggleDrawer();
            Linking.openURL(FAQ_URL) 
           
          }}
        />
        <DrawerItem
          label={({ color }) => (
            <View style={{ flexDirection: "row",height:40,marginTop:-15 }}>
              <Image
                style={{ width: 35, height: 35, backgroundColor: "white" }}
                source={require("../../Image/logout.png")}
              />
              <Text style={{ color: "black", marginTop: 5, marginLeft:5, fontWeight: "bold" }}>Logout</Text>
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
    position: "absolute",
    width: "100%",
    height: "58%",
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
    paddingTop: 10,
    flexDirection: "column",
    padding: 10,
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
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: AppColors.colorPrimary,
    marginTop: 15,
    marginTop: 15,
  },
});
