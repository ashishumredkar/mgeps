// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, { useState,useEffect } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { gStyles } from "../../../src/style/appStyles";
import AsyncStorage from "@react-native-community/async-storage";

import { Card } from "react-native-elements";

const ProfileScreen = (props) => {
  const [profileData, setProfileData] = useState({
    id: 23,
    user_type: 11,
    username: "kiranab",
    salutation: "Mr",
    fname: "kiran",
    mname: "a",
    lname: "b",
    email: " ",
    designation: "dev",
    gender: "Male",
    hint_question_id: 3,
    hint_answer: "45",
    mobile: "435643564645645",
    phone_country_code: 63,
    phone_no: 456546546,
    landline_extension_no: "4564",
    area_code: "54645",
    fax_number: "456456456",
    fax_area_code: "45654",
    fax_extension_no: "4564",
    otp: 58155,
    location: "local",
    company_type: 3,
    bussiness_reg_number: "",
    organization_name: "ABCD",
    old_organization_name: null,
    bussiness_tax_number: "123123213123",
    is_deleted: "N",
    primary_user_id: 0,
    is_primary_user: "Y",
    primary_parent_id: 23,
    reset_password_code: null,
    fcm_id: 0,
    mobile_country: null,
    is_migration: "NO",
    is_data_update: "YES",
    old_user_id: 0,
    modified: "2019-04-27T19:08:35+08:00",
    created: "2019-04-27T19:08:35+08:00",
  });

  const [animating, setAnimating] = useState(true);

  useEffect(() => {
      setAnimating(false);
      //Check if user_id is set or not
      //If not then send for Authentication
      //else send to Home Screen
      AsyncStorage.getItem('@user_data').then((value) =>{
       const abc=JSON.parse(value)
        setProfileData(abc)
      }
    
      );
   
  }, [profileData,animating]);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card style={{ padding: 10, margin: 10, height: "40%" }}>
        <View style={{ flexDirection: "row" }}>
         
            <View style={[gStyles.userAvatarStyle]}>
              <Text>
                {profileData.fname.charAt(0) + profileData.lname.charAt(0)}
              </Text>
            </View>
          

          <View style={{ width: 10 }}></View>

          {/* CONTACT DETAILS  */}
          <View style={{ paddingTop: 8 }}>
            <Text style={gStyles.contactStyle}>
              {profileData.fname} {profileData.mname} {profileData.lname}
            </Text>
            <Text>
              {profileData.email === undefined || profileData.email.length === 0
                ? "email"
                : profileData.email}
            </Text>
          </View>
        </View>
      </Card>
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "grey",
          marginTop: 8,
        }}
      />

      <Card style={{ padding: 10, margin: 10 }}>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1, flexDirection: "column", marginStart: 15 }}>
              <Text>Username</Text>
              <Text>{profileData.username}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text>Salutation</Text>
              <Text>{profileData.salutation}</Text>
            </View>
          </View>

          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "grey",
              marginTop: 8,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              backgroundColor: "white",
            }}
          >
            <View style={{ flex: 1, flexDirection: "column", marginStart: 15 }}>
              <Text>Gender</Text>
              <Text>{profileData.gender}</Text>
            </View>

            <View style={{ flex: 1, flexDirection: "column" }}>
              <Text>Mobile</Text>
              <Text>{profileData.phone_no}</Text>
            </View>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    backgroundColor: "white",
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#34495e",
  },
});
